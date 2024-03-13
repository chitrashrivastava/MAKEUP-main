module.exports = function isLoggedIn(req, res, next) {
    // Passport.js adds the `isAuthenticated` method to the request object
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware or route handler
    }
  
    res.redirect('/signin'); 
}
  