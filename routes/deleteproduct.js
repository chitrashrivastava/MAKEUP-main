const express = require('express');
const router = express.Router();
const Product = require('../models/products');
router.get('/delete-product/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }
    res.redirect('/seller'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
