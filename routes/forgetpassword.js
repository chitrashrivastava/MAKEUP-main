var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/userModel");

router.get("/forget", function (req, res, next) {
    res.render("forget", { admin: req.user });
});

module.exports=router