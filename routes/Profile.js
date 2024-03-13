const express=require('express')
const router=express.Router()
const User=require('../models/userModel')
const passport=require('passport')

router.get('/profile',async(req,res)=>{
    if(req.user){
    try{
        console.log(req.user)
        res.render('Profile',{user:req.user,admin:req.user})
    }catch(e){
        console.log(e)
        res.send(e)
    }
}
else{
    res.redirect('/signin')
}
})

// Profile update
router.get('/updateprofile',(req,res)=>{
    res.render('updateprofile',{user:req.user,admin:req.user})
})
router.post('/updateprofile', async (req, res) => {
    try {
      const { username, email, phone, address, country, accounttype } = req.body;
  
      // Assuming you have a user ID available in the session
      const userId =req.user._id
  
      // Update the user in the database
      await User.findByIdAndUpdate(userId, {
        username,
        email,
        phone,
        address,
        country,
        accounttype
      });
  
      res.redirect('/profile'); // Redirect to the user profile page
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Delete Profile - POST
  router.get('/deleteprofile', async (req, res) => {
    try {
        // Assuming you have a user ID available in the session
        const userId = req.user._id;
    
        // Delete the user from the database
        await User.findByIdAndDelete(userId);
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          });
    }
    catch (error) {
        console.log(error)
    }
  });
  
module.exports=router