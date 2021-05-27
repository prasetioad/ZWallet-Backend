const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    service : 'Gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  const sendForgotMail = (token, userid, email)=>{
      return new Promise(async (resolve, reject) =>{
          let info = await transporter.sendMail({
              from: process.env.EMAIL, // sender address
              to: email, // list of receivers
              subject: "Forgot Password ✔", // Subject line
              text: "Hello world?", // plain text body
              html: `    <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
                  <style>
            header{
                color: #fff;
                background-color: #6379F4;
                font-family: 'Mulish', Georgia, 'Times New Roman', Times, serif;
                text-align: center;
                margin-left: auto;
                margin-right: auto;
                padding: 15px auto;
            }
            main{
                background-color: blanchedalmond;
                background-color: #6379F4;
                font-family: 'Mulish', Georgia, 'Times New Roman', Times, serif;
                text-align: left;
            }
            footer{
                background-color: #6379F4;
                color: #fff;
                padding: 10px auto;
            }
        </style>
              </head>
              <body>
                  <header>
                      <h3>FROM ZWALLET</h3>
                  </header>
                  <main>
                      <p>Hello there...</p>
                      <p></p>
                      <p>You can reset your password by clicking this link :</p>
                      <p>${process.env.HOSTING}activation/forgot-password/${token}/${userid}/${email}<p>
                  </main>
                  <footer>
                        <p>regards...</p>
                        <p>team</p>
                   </footer>
              </body>
              </html> `, // html body
            });
            resolve(info)
      })
  }

  module.exports = sendForgotMail
