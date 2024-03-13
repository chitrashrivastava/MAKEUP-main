const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;  // Import LocalStrategy
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Passport local strategy setup
passport.use(new LocalStrategy({
  usernameField: 'username',  // assuming the username field is named 'username' in your form
  passwordField: 'password',  // assuming the password field is named 'password' in your form
}, async (username, password, done) => {
  try {
    // Find the user with the provided username in your database
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    // Compare the entered password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // If passwords match, authentication is successful
      return done(null, user);
    } else {
      // If passwords don't match, authentication fails
      return done(null, false, { message: 'Incorrect password.' });
    }
  } catch (error) {
    return done(error);
  }
}));

router.get("/signin", (req, res) => {
  res.render("Signin", { admin: req.user }); // Assuming you have a view engine set up
});

router.post("/signin", passport.authenticate("local", {
  successRedirect: "/", // Redirect on successful login
  failureRedirect: "/signin",    // Redirect on failed login
  failureFlash: true              // Enable flash messages for failed login
}));

module.exports = router;
