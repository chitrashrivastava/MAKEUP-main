require('dotenv').config('./.env')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fileupload=require('express-fileupload')
require('./models/config')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signup=require('./routes/Signup')
var signin=require('./routes/Signin')
var profile=require('./routes/Profile')
var logout=require('./routes/Logout')
var SellerProducts=require('./routes/SellerProducts')
var addproducts=require('./routes/addproduct')
const contact=require('./routes/contact')
var explore=require('./routes/Exploreproducts')
const addToCartRouter = require('./routes/addtocart');
const viewCartRouter = require('./routes/viewcart');
const deleteCartItem=require('./routes/deletecart')
const success=require('./routes/success')
var app = express();
const session=require('express-session')
const passport = require("passport");
const User = require("./models/userModel");
const forgetRoutes=require('./routes/forgetpassword')
const sendMail=require('./routes/sendmail')
const updateproduct=require('./routes/updateproduct')
const shipping=require('./routes/shippinginfo')
const deletedProduct=require('./routes/deleteproduct')
const orders=require('./routes/orders')
const requestedProducts=require('./routes/requestedproducts')
const about=require('./routes/about')
const flash = require('express-flash');
const ErrorHandler = require('./utils/Errorhandler');

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use(flash());
app.use(fileupload())
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
app.use(
  session({
      saveUninitialized: true,
      resave: true,
      secret: "asdhbcfkjf",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/',signup)
app.use('/',signin)
app.use('/',profile)
app.use('/',addproducts)
app.use('/',explore)
app.use('/',addToCartRouter)
app.use('/', viewCartRouter);
app.use('/',SellerProducts)
app.use('/',deleteCartItem)
app.use('/', forgetRoutes);
app.use('/', sendMail);
app.use('/',updateproduct);
app.use('/',shipping)
app.use('/',deletedProduct)
app.use('/',success)
app.use('/',contact)
app.use('/',about)
app.use('/',requestedProducts)
app.use('/',orders)
app.use('/',logout);

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested url not found ${req.url} or soon it will be updated`, 404));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
