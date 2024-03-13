const express = require('express');
const router = express.Router();
const path = require('path');
const Product = require('../models/products');
const User = require('../models/userModel');
const isLoggedIn = require('./isLoggedIn');
const imagekit = require('../utils/imageKit').initimagekit();


router.get('/addproducts', (req, res) => {
  res.render('addproduct', { admin: req.user });
});

router.post('/addproduct',isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    // Upload image to ImageKit
    const imageKitResponse = await imagekit.upload({
      file: req.files.productImage.data,
      fileName: `${new Date().toISOString().replace(/[-:.]/g, '')}.jpg`,
    });

    const newProduct = new Product({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productImage: imageKitResponse.url,
      uploadedBy: user._id,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();
    res.send('Uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
