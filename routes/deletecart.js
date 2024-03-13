// routes/deleteCartItem.js

const express = require('express');
const router = express.Router();
const CartItem = require('../models/addtocart');

router.post('/deleteCartItem', async (req, res) => {
  try {
    const cartItemId = req.body.cartItemId;
    await CartItem.findOneAndDelete({ _id: cartItemId });
    res.redirect('/viewcart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
