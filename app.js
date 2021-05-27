const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3600

const Routes = require("./routes")
const db = require("./models/index")
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/avatar", express.static('./uploads'));
app.use(bodyParser.json())

db.sequelize.sync().then(
    () => console.log(`[DATABASES] Connected`),
    (err) => console.log(`[DATABASES] Failed To Connect (${err})`)
  );


  app.use("/v1", Routes);


app.use("*", (req, res) => {
    if (req.params["0"].match("/v1")) {
      res.status(405).json({
        status: false,
        message: "Method Not Allowed",
        data: null,
      });
    }
  });


app.listen(port, () =>{
    console.log('ZWallet server running in port ', port);
})