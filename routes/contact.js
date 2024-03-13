const express=require('express')
const router=express.Router()
const contact=require('../models/contact')
const isLoggedIn = require('./isLoggedIn')
router.get('/contact',(req,res)=>{
    res.render('contact',{admin:req.user})
})
router.post('/contact',(req,res)=>{
    const newContact=new contact({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    })
    newContact.save()
    .then(()=>{
        res.send(`<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            Swal.fire({
                icon: 'success',
                title: 'Query Submitted',
                text: 'We will get back soon!',
            })
            .then(function() {
                window.location.href = '/';
            });
        });
        </script>`)
    })
    .catch((err)=>{
        res.send(`<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            Swal.fire({
                icon: 'error',
                title: 'Opps Error Occured!',
            })
        });
        </script>`)
    })
})
module.exports=router