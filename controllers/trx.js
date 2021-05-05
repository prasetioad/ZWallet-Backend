const db = require('../models')
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt')
const formResult = require('../helpers/formResult');
const trx = require('../models/trx');
const paginate = require('../helpers/pagination.js')
const {decodeByHeader} = require('../helpers/jwthelper')
const { Op } = require("sequelize");
const Trx = db.trx
const User =db.user


exports.getTrx= async (req, res)=>{
    const data = await decodeByHeader(req)
    console.log('query ',req.query);
    const {page, perPage, mode} = req.query
    console.log('sort', mode);
    const { limit, offset, sort} =await paginate(page, perPage, mode);
    console.log(sort);
    Trx.findAndCountAll({
        where: {
           userId: data.userId
        },
        offset: offset,
        limit: limit,
        order: [ ['updatedAt',sort] ]
     })
     .then(result => {
       return formResult(res, 200, true, 'Success get data', result)
     }).catch((err)=>{ return formResult(res, 501, false, err, null)})
}
exports.getTrxById =(req, res)=>{
    Trx.findAll({where:{userId: req.params.id}})
    .then((result)=>{
        formResult(res, 201, true, 'success', result)
    })
    .catch((err)=>{
        formResult(res, 501, false, err, null)
    })
}

exports.creatTrx =(req, res)=>{
    req.body.dateTime = new Date()
    console.log(req.body);
    Trx.create(req.body)
    .then((result) =>{
        User.findOne({where: {userId: req.body.userId}})
        .then((found)=>{
            const deposit = result.dataValues
            deposit.userId = req.body.destId
            deposit.destId = req.body.userId
            deposit.desc = "Deposit"
            deposit.avatar = found.dataValues.avatar
            deposit.balance = found.dataValues.balance
            delete deposit.id
            console.log(deposit);
            Trx.create(deposit)
            .then((deResult)=>{
                return formResult(res, 200, true, 'Transfer s:'+result, 'Deposit: '+deResult)
            })
            .catch((err)=>{return formResult(res, 401, false, 'failed creat Deposit', err)})
        })
        .catch((err)=>{
            return formResult(res, 401, false, 'failed', err)
        })
    })
    .catch((err)=>{
        console.log(err);
        formResult(res, 401, false, 'failed creat trx!', null)
    })
}

exports.getTrxByDate=(req, res)=>{
    const userId = req.params.id
    console.log(userId);
    // console.log(userId);
    // Trx.findAll({
    //     where: {
    //        userId: userId
    //     },
    //     offset: 0,
    //     limit: 10,
    //     order: [ ['updatedAt','DESC'] ]
    //  }).then((result)=>{
    //      return formResult(res, 200, true, 'success', result)
    //  }).catch((err)=>{
    //     return formResult(res, 200, true, err, null)
    //  })
    let curr = new Date();
    let first = curr.getDate() - curr.getDay();
  let last = first - 6;
  let firstday = new Date(`${curr.getFullYear()}-${curr.getMonth() + 1}-${first} 07:00:00`);
  let lastday = new Date(`${curr.getFullYear()}-${curr.getMonth() + 1}-${last} 07:00:00`);
  Trx.findAll({
    where: { 
        [Op.or]: [{ userId: userId }],
        createdAt: { [Op.between]: [lastday, curr] },
    },
})
  .then((result)=>{
      return formResult(res, 200, true, 'success', result)})
  .catch((err)=>{
        return formResult(res, 200, true, err, null)
     })
}