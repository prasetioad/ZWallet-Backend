const nodemailer = require("nodemailer")
const { PASSWORD } = require("../configs")
const formResult = require('../helpers/formResult')
require('dotenv').config()

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    service : 'Gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
})

const sendMail =(email, token) => {
    return new Promise((resolve, reject) =>{
        try {
            transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "ZWallet verification",
                text: "ZWallet",
                html:
                `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    <body>
                        <p>This is your verification code:</p>
                        <p>
                           ${process.env.HOSTING}verify?id=${token}
                        </p>
                    </body>
                    </html>
                `
            })
            .then((res) =>{
                console.log('mail sent');
                resolve('success', res)
            })
            .catch((err)=>{
                console.log(err);
                reject('failed', err)
            })
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

module.exports = sendMail