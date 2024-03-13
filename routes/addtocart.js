// routes/addtocart.js

const express = require('express');
const router = express.Router();
const CartItem = require('../models/addtocart');
const calculateTotalPrice = require('./pricecalculate');

router.post('/addtocart', async (req, res) => {
  try {
    const productId = req.body.productId;
    const userId = req.user._id;
    const quantity = parseInt(req.body.quantity) || 1; // Ensure quantity is at least 1
    const productPrice = parseFloat(req.body.productPrice); // Assuming productPrice is a decimal

    // Calculate the total price
    const totalPrice = quantity * productPrice;

    const existingCartItem = await CartItem.findOne({ userId, productId });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice += totalPrice;
      await existingCartItem.save();
    } else {
      const newCartItem = new CartItem({
        userId,
        productId,
        quantity,
        totalPrice,
      });

      await newCartItem.save();
    }

    res.redirect('/viewcart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
