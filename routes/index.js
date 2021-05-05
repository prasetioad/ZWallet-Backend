const express = require("express");
const user = require('./user');
const trx = require('./trx');
const Route = express.Router();

Route.use("/users", user)
Route.use("/trx", trx)


module.exports = Route;
