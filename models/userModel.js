const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')
const passportLocalMongoose = require("passport-local-mongoose");

const userModel = new mongoose.Schema({
  username: {
      type: String,
      unique: true,
      required: [true, "Username is required!"],
      minLength: [4, "Username field must have at least 4 characters"],
  },
  email: {
      type: String,
      lowercase: true,
      required: [true, "Email is required!"],
      unique:true
  },
  password: {
      type: String,
  },
  phone: {
      type: String,
      unique: true,
  },
  dp:{
    type:String,
  },
 
  accounttype:String,
  resetPasswordOtp: {
    type: Number,
    default: -1,
  },

});
userModel.plugin(passportLocalMongoose);

userModel.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
userModel.methods.comparePassword=function(password){
  return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model("user", userModel);