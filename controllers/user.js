const db = require('../models')
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const formResult = require('../helpers/formResult');
const paginate = require('../helpers/pagination.js')
const jwt = require('jsonwebtoken')
const sendMail = require('../middleware/mailer');
const sendForgotMail = require('../middleware/forgotMailer')
const { getTokenVerify, decodeToken, getToken, decodeByHeader, verifyToken } = require('../helpers/jwthelper');
const { Op } = require("sequelize");

const User = db.user

exports.register = async (req, res) => {
    console.log('jalandong', req.body);
    if (req.body.email) {
        console.log('berjalan', req.body);
        User.findOne({ where: { email: req.body.email } }).then(async (found) => {
            console.log(found);
            if (found) {
                return formResult(res, 401, false, " Email Sudah ada!", null)
            } else {
                req.body.firstName = req.body.userName
                req.body.userId = uuidv4();
                req.body.password = await bcrypt.hash(req.body.password, 10).then((result) => {
                    req.body.password = result; return req.body.password
                })
                    .then(() => {
                        console.log(req.body);
                        const token = getTokenVerify(req.body)
                        console.log('masuk email', token);
                        sendMail(req.body.email, token)
                        formResult(res, 201, true, "Success Register, Please Verify Your Email!", null);
                    })
                    .catch((err) => {
                        formResult(res, 500, true, err, null);
                    })
            }
        }).catch((err) => { formResult(res, 201, false, err, null) })
    } else {
        console.log('gagal');
        return formResult(res, 401, false, " Email Sudah ada!", null)
    }
}

exports.getProfil = (req, res) => {
    const auth = req.headers.authorization
    const token = auth.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        const userId = decoded.userId
        User.findOne({ where: { userId }, order: ["userId"] })
            .then((result) => {
                formResult(res, 200, true, "Success Get Profile", result);
            })
            .catch(() => {
                formResult(res, 401, false, 'Data not found', null)
            })
    })
}

exports.verify = (req, res) => {
    const decode = decodeToken(req.params)
    console.log(decode.firstName);
            User.create(decode)
                .then((result) => {
                    formResult(res, 201, true, 'success', result)
                })
                .catch((err) => {
                    formResult(res, 201, true, err, result)
                })
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const checkEmail = await User.findOne({ where: { email }, order: ["email"] }).then((result)=>{
        return result.dataValues;
    }).catch((err)=>{
        console.log( formResult(res, false, 401, 'Email not registered!', err));
    })
    if (checkEmail) {
        const password = bcrypt.compareSync(req.body.password, checkEmail.password)
        console.log('passowrdnya adalah ', req.body.password, checkEmail);
        if (password) {
            delete checkEmail.password;
            const token = getToken(checkEmail)
            console.log(token);
            formResult(res, 201, true, 'Login Success!', { checkEmail, token })
        } else {
            formResult(res, 401, "Password wrong!", null)
        }
    } else {
        formResult(res, false, 401, 'Email not registered!', null)
    }
}

exports.getAll = async (req, res) => {
    const decode = decodeByHeader(req)
    const userId = decode.userId
    if(req.query.search !== undefined){
        let {search}= req.query
        User.findAll({where: {userName: {[Op.like]: `%${search}%`}}})
          .then((result) => {return formResult(res, 200, true, 'success', result)})
          .catch((err)=>{return formResult(res, 401, false, err, null)})
    }else{
        const { page, perPage } = req.query
        const { limit, offset } = paginate(page, perPage);
        User.findAndCountAll({
            where: { [Op.not]: { userId } },
            limit: limit,
            offset: offset
        })
            .then((result) => {
                formResult(res, 200, true, 'getAll!', result)
            })
            .catch((err) => {
                formResult(res, 401, 'failed get all', err)
            })
    }
}

exports.getById = (req, res) => {
    const userId = req.params.id
    User.findOne({ where: { userId: userId } })
        .then((result) => {
            formResult(res, 201, true, 'Get by id Success', result)
        })
        .catch((err) => {
            formResult(res, 501, false, err, null)
        })
}

exports.transfer = (req, res) => {
    console.log(req.body.amount);
    const userId = req.params.id
    const { destId } = req.body
    User.findOne({ where: { userId: userId } })
        .then((user) => {
            if (user.balance < req.body.amount) {
                return formResult(res, 500, false, "Saldo anda tidak cukup!", null)
            } else {
                User.findOne({ where: { userId: destId } })
                    .then((destRes) => {
                        if (destRes == null || destRes == undefined) {
                            return formResult(res, 500, false, "Penerima tidak ada", null)
                        } else {
                            const balance = user.balance - req.body.amount
                            console.log(balance);
                            User.update({ balance: balance }, { where: { userId: userId } })
                                .then((result) => {
                                    formResult(res, 201, true, "success", result)
                                    const destBalance = (destRes.balance / 2 * 2) + (req.body.amount / 2 * 2)
                                    User.update({ balance: destBalance }, { where: { userId: destId } })
                                    console.log(destBalance);
                                })
                                .catch((err) => {
                                    return formResult(res, 500, false, err, null)
                                })
                        }
                    }).catch((err) => { return formResult(res, 500, false, err, null) })
            }
        })
        .catch((err) => {
            return formResult(res, 500, false, err, null)
        })
}

exports.avatar = (req, res) => {
    console.log(req.file);
    const avatar = `${process.env.HOST}/avatar/${req.file.filename}`
    User.update({ avatar: avatar }, { where: { userId: req.params.id } })
        .then((result) => {
            return formResult(res, 201, true, "Success Update", result)
        })
        .catch((err) => {
            return formResult(res, 501, false, err, null)
        })
}

exports.profile = (req, res) => {
    const userId = req.params.id
    User.update(req.body, { where: { userId }, order: ["userId"] })
        .then((result) => {
            return formResult(res, 201, true, "success", result)
        })
        .catch((err) => {
            return formResult(res, 401, false, " failed", err)
        })
}

exports.delete = (req, res) => {
    const userId = req.params.id
    User.update({ where: { userId: userId } })
        .then((found) => {

        })
        .catch((err) => {
            console.log(err);
        })
}

exports.checkPin = async (req, res) => {
    console.log('dari body', req.body);
    const user = await User.findOne({ where: { userId: req.params.id } })
    console.log(user.pin);
    if (user.pin != req.body.pin) {
        return formResult(res, 401, false, 'Invalid PIN', null)
    } else {
        return formResult(res, 200, true, 'Correct!', null)
    }
}

exports.change = (req, res) => {
    User.findOne({ where: { userId: req.params.id } })
        .then(async (found) => {
            if (req.body.for === "password") {
                console.log(req.body.current);
                console.log(found.password);
                const password = bcrypt.compareSync(req.body.current, found.password)
                if (!password) {
                    return formResult(res, 401, false, "Your current password is incorrect!", null)
                } else {
                    req.body.new = await bcrypt.hash(req.body.new, 10).then((result) => {
                        req.body.new = result; return req.body.new
                    })
                    User.update({ password: req.body.new }, { where: { userId: req.params.id } })
                        .then(() => {
                            return formResult(res, 201, true, " Success change password!", null)
                        })
                        .catch((err) => { return formResult(res, 501, false, 'fail to change password', err) })
                }
            } else {
                User.update({ pin: req.body.pin }, { where: { userId: req.params.id } })
                    .then((result) => {
                        return formResult(res, 201, true, " Success change PIN!", result)
                    })
                    .catch((err) => { return formResult(res, 501, false, "fail to change PIN", err) })
            }
        })
        .catch((err) => { return formResult(res, 401, false, 'User not found!', err) })
}

exports.search = (req, res)=>{
    User.findAll({
        include: [{
          model: Artists,
          as: 'Singer',
          where: { name: 'Al Green' } 
        }]
      })
      .then(albums => console.log(albums))
      .catch(console.error)
}

exports.resetPassword= async(req, res)=>{
    try{
        console.log(req.body);
    const found = await User.findOne({where: req.body}).then((res)=> {return res.dataValues})
    .catch((err)=>{ return formResult(res, 401, false, 'Email tidak terdaftar!', err)})
    if(found == null){
        return formResult(res, 401, false, 'Email tidak terdaftar!', err)
    }else{
        console.log('mengirim email ...');
        const data = {userId: found.userId, email: found.email}
        const token = getToken(data)
        const status = await sendForgotMail(token, found.userId, found.email)
        return formResult(res, 201, true, 'Email terkirim!', status)
    }
    } catch (err){
        return formResult(res, 401, false, 'Internal Server Error!', err)
    }
}

exports.updateUser = async(req, res)=>{
    try{
        const cek = verifyToken(req)
        if(!cek){
            return formResult(res, 401, false, 'Token expired!', err)
        }else{
            console.log(req.params.id);
            req.body.password = await bcrypt.hash(req.body.password, 10)
            .then((result)=>{req.body.password = result; return req.body.password})
            console.log(req.body);
            User.update(req.body, {where: {userId : req.params.id}})
            .then((result)=>{
                return formResult(res, 201, true, 'Success', result)
            })
            .catch((err)=>{
                console.log(err);
                return formResult(res, 401, false, 'Internal Server Error', err)
            })
        }
    } catch {
        return formResult(res, 401, false, 'Internal Server Error', err)
    }
}
