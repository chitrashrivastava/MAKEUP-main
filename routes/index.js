var express = require('express');
var router = express.Router();
const isLoggedIn = require('./isLoggedIn');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { admin:req.user});
});

module.exports = router;
