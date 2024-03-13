const express = require('express');
const router = express.Router();

router.get('/about',async(req,res)=>{
        res.render('About',{user:req.user,admin:req.user})
  
})

module.exports=router;