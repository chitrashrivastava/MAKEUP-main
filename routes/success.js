var express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const CartItem = require('../models/addtocart');
const isLoggedIn = require('./isLoggedIn');
const instance = new Razorpay({
  key_id: 'rzp_test_fFWtGjz2idnRtM',
  key_secret: 'b0F1u2o4jNEtqOW9GFah7bRX',
});

router.get('/success', isLoggedIn, async (req, res) => {
  res.redirect('/payment');
});

router.get('/payment', isLoggedIn, async (req, res) => {
  try {
    const products = await CartItem.find({ userId: req.user._id }).populate('productId');
    const totalPrice = products.reduce((total, product) => total + product.totalPrice, 0);

    res.render('payment', { user: req.user, products, admin: req.user, totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/create/orderId', async (req, res, next) => {
  try {
    const products = await CartItem.find({ userId: req.user._id }).populate('productId');
    const totalPrice = products.reduce((total, product) => total + product.totalPrice, 0);
    const amountInPaisa = Math.floor(totalPrice * 100);
    const options = {
      amount: amountInPaisa,
      currency: 'INR',
      receipt: 'pranjalshukla245@gmail.com',
    };

    instance.orders.create(options, (err, order) => {
      if (err) {
        console.error('Error creating order:', err);
        return res.status(500).send('Internal Server Error');
      }

      console.log(order);
      res.redirect('/'); // Redirect to the '/' route after successful order creation
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/api/payment/verify', function (req, res) {
  try {
    let razorpayPaymentId = req.body.response.razorpay_payment_id;
    let razorpayOrderId = req.body.response.razorpay_order_id;
    let signature = req.body.response.razorpay_signature;
    let secret = 'b0F1u2o4jNEtqOW9GFah7bRX';
    const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
    const result = validatePaymentVerification({ order_id: razorpayOrderId, payment_id: razorpayPaymentId }, signature, secret);
    // Send alert and redirect to /' route
    res.send(`<script>
      alert('Payment Successful');
      window.location.href = '/';
    </script>`)

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
