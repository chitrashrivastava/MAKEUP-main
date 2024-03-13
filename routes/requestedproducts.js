const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const ShippingInfo = require('../models/shippinginfo');
const isLoggedIn = require('./isLoggedIn');
const Product = require('../models/products'); // Make sure this is the correct model

router.get('/requestedproducts', async (req, res) => {
    try {
        const userId = req.user._id; // Ensure you are getting the user ID
        const shippingInfoArray = await ShippingInfo.find({ sellerId: userId }).populate('productIds');
console.log(shippingInfoArray)
        res.render('requestedproducts', { user: req.user, admin: req.user, shippingInfoArray });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/updateDeliveryStatus', async (req, res) => {
    try {
        const shippingInfoId = req.body.shippingInfoId;
        const newDeliveryStatus = req.body.deliveryStatus;
        await ShippingInfo.findByIdAndUpdate(shippingInfoId, { $set: { deliveryStatus: newDeliveryStatus } });
        res.redirect('/requestedproducts');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
