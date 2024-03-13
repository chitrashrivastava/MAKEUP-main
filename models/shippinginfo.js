// shippinginfo.js

const mongoose = require('mongoose');

const shippingInfoSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sellerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true

  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }],
  quantities: [{
    type: Number,
    required: true,
  }],
  deliveryStatus:{
    type:String,
    default:"To be set by seller"
  },
  totalPriceForItem:{
    type:Number,
    required:true
  }
});

const ShippingInfo = mongoose.model('ShippingInfo', shippingInfoSchema);
module.exports = ShippingInfo;
