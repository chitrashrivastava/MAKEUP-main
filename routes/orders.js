const express = require('express');
const router = express.Router();
const shippingorders = require('../models/shippinginfo');
const isLoggedIn = require('./isLoggedIn');

router.get('/orders',isLoggedIn, async (req, res) => {
    try {
        const orders = await shippingorders.find({ userId: req.user._id }).populate('productIds').lean();
        console.log(orders);
        res.render('order', { orders ,admin:req.user});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
