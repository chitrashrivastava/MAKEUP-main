// routes/exploreproducts.js

const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const User = require('../models/userModel');
const isLoggedIn = require('./isLoggedIn');

router.get('/explore', isLoggedIn, async (req, res) => {
  try {
    
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (user && user.accounttype === 'Buyer') {
      let query = {};

      // Filter by product name
      if (req.query.productName) {
        query.productName = new RegExp(req.query.productName, 'i');
      }

      // Filter by price range
      if (req.query.minPrice || req.query.maxPrice) {
        query.productPrice = {};
        if (req.query.minPrice) {
          query.productPrice.$gte = req.query.minPrice;
        }
        if (req.query.maxPrice) {
          query.productPrice.$lte = req.query.maxPrice;
        }
      }

      let products;

      // Check if there's a sort query parameter
      if (req.query.sort === 'lowToHigh') {
        products = await Product.find(query).sort({ productPrice: 1 });
      } else if (req.query.sort === 'highToLow') {
        products = await Product.find(query).sort({ productPrice: -1 });
      } else {
        products = await Product.find(query);
      }

      // Store filters in locals to be used in the template
      res.locals.filters = {
        productName: req.query.productName || '',
        minPrice: req.query.minPrice || '',
        maxPrice: req.query.maxPrice || '',
        sort: req.query.sort || '',
      };

      res.render('Exploreproducts', { products, admin: req.user, filters: res.locals.filters });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
