const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const isLoggedIn = require('./isLoggedIn');
const multer = require('multer');
const path = require('path');
const fs=require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/Products/');
    },
    filename: function (req, file, cb) {
      const productId = new Date().toISOString().replace(/[-:.]/g, '');
      const filename = productId + path.extname(file.originalname);
      cb(null, filename);
    },
  });
  
const upload = multer({ storage: storage });

// Display the update-product form
router.get('/update-product/:productid', async (req, res) => {
  try {
    const admin = req.user;
    const product = await Product.findById(req.params.productid);
    res.render('updateproduct', { admin, product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle updating the product details
// Handle updating the product details
router.post('/update-product/:productid', isLoggedIn, upload.single('productImage'), async (req, res) => {
    try {
      const admin = req.user;
      const product = await Product.findById(req.params.productid);
  
      // Delete the old image file
      if (product.productImage) {
        fs.unlinkSync(product.productImage);
      }
  
      // Update product details
      product.productName = req.body.productName;
      product.productDescription = req.body.productDescription;
      product.productPrice = req.body.productPrice;
  
      // Update product image if a new image is uploaded
      if (req.file) {
        product.productImage = req.file.path;
      }
  
      await product.save();
      res.redirect('/seller'); // Redirect to the seller page after updating
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
module.exports = router;
