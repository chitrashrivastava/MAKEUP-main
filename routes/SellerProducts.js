const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const isLoggedIn = require('./isLoggedIn');
const passport = require('passport');

router.get('/seller', isLoggedIn, async (req, res) => {
  try {
    const admin = req.user; 
    console.log(admin)
    if (admin && admin.accounttype === 'Seller') {
        const products = await Product.find({ uploadedBy: admin._id });
      console.log(products)
      res.render('Sellerproducts', { admin, products });
    } else {
      res.redirect('/'); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
