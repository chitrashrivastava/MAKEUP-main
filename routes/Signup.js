var express = require("express");
var router = express.Router();
const User = require("../models/userModel");
const imagekit = require('../utils/imageKit').initimagekit();
const flash = require('express-flash');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const path=require('path')
router.get('/signup', (req, res, next) => {
    res.render('Signup', { admin: req.user });
});

router.post('/signup', async (req, res, next) => {
    try {
        console.log(req.body)
        const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });

        if (existingUser) {
            return res.send(`<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                <script>
                document.addEventListener('DOMContentLoaded', function() {
                    Swal.fire({
                        icon: 'error',
                        title: 'Duplicate User',
                        text: 'A user with the same username or email already exists',
                    })
                    .then(function() {
                        window.location.href = '/signup';
                    });
                });
                </script>
            `);
        }

        if (!passwordRegex.test(req.body.password)) {
            return res.send(`<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid Password',
                            text: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit',
                        }).then(()=>{
                            window.location.href='/signup';
                        });
                    });
                </script>
            `);
        }
        const file=req.files.dp
        const modifiedFileName=`dp-${Date.now()}${path.extname(file.name)}`
        const {fieldId,url}=await imagekit.upload({
            file:file.data,
            fileName:modifiedFileName,
        })
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            password:req.body.password,
            accounttype:req.body.accounttype
        })
        console.log(newUser)
        newUser.dp = url;

await newUser.save()

        res.send(`<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: 'You can now login',
                    }).then(function() {
                        // Redirect to /signin
                        window.location.href = '/signin';
                    });
                });
            </script>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
