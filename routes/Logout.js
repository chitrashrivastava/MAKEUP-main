const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});

module.exports=router