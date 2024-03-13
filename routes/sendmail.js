var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const { escapeScriptTag } = require("../utils/security");
router.post("/send-mail", async function (req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.send("User not found");

        sendmailhandler(req, res, user);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

function sendmailhandler(req, res, user) {
    const otp = Math.floor(1000 + Math.random() * 9000);
    // admin mail address, which is going to be the sender
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "pranjalshukla245@gmail.com",
            pass: "kwut mojg ajxs lhuf",
        },
    });

    const mailOptions = {
        from: "Chat-Dictive Pvt. Ltd.<pranjalshukla245@gmail.com>",
        to: user.email,
        subject: "🌟 Makeup Magic Password Reset 🌟",
        // text: req.body.message,
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
        
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        
            h1 {
              text-align: center;
              color: #ff69b4; /* Pink color for a makeup theme */
            }
        
            p {
              color: #333;
              font-size: 16px;
            }
        
            .otp-container {
              text-align: center;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 5px;
            }
        
            .otp {
              font-size: 24px;
              color: #ff69b4; /* Pink color for a makeup theme */
            }
        
            .note {
              margin-top: 20px;
              color: #555;
            }
          </style>
        </head>
        
        <body>
        
          <div class="container">
            <h1>Makeup Magic Password Reset</h1>
        
            <p>Dear beauty enthusiast,</p>
        
            <p>We received a request to reset your password. Below is the One Time Password (OTP) you'll need to complete the magical transformation:</p>
        
            <div class="otp-container">
              <p class="otp">${otp}</p>
            </div>
        
            <p class="note">Note: This OTP is like the secret ingredient for your new password. Keep it safe and use it wisely.</p>
        
            <p>If you did not request this password reset, you can gracefully ignore this email.</p>
        
            <p>Thank you,<br>Makeup Magic Team</p>
          </div>
        
        </body>
        
        </html>
        
        `,
    };
    // actual object which intregrate all info and send mail
    transport.sendMail(mailOptions, async (err, info) => {
        if (err) {
           res.send(err)
        }

        console.log(info);
        user.resetPasswordOtp = otp;
        await user.save();
        res.render("otp", { admin: req.user, email: user.email, success: "Email sent successfully" });
    });
}
router.post("/match-otp/:email", async function (req, res, next) {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user.resetPasswordOtp == req.body.otp) {
            user.resetPasswordOtp = -1;
            await user.save();
            res.render("resetpassword", { admin: req.user, id: user._id });
        } else {
            res.send(
                "Invalid OTP, Try Again <a href='/forget'>Forget Password</a>"
            );
        }
    } catch (error) {
        res.send(error);
    }
});
router.post('/resetpassword/:id', async function (req, res, next) {
    try {
        const user = await User.findById(req.params.id);

        // Validate password format before setting
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(req.body.password)) {
            const errorMessage = 'Password must meet the following criteria: at least one lowercase letter, one uppercase letter, one digit, and one special character.';
            throw new Error(errorMessage);
        }

        // Use setPassword method provided by passport-local-mongoose
        user.setPassword(req.body.password, async function (err) {
            if (err) {
                throw err;
            }

            // Save the user to the database
            await user.save();

            // Log in the user
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }

                const escapedMessage = escapeScriptTag('Password successfully reset!');
                return res.send(`
                    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                    <script>
                        document.addEventListener('DOMContentLoaded', function () {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: '${escapedMessage}',
                            }).then(() => {
                                window.location.href = '/signin';
                            });
                        });
                    </script>
                `);
            });
        });
    } catch (error) {
        console.error(error);

        const escapedErrorMessage = escapeScriptTag(error.message || 'Error resetting password. Please try again.');
        return res.send(`
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
            <script>
                document.addEventListener('DOMContentLoaded', function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: '${escapedErrorMessage}',
                    }).then(() => {
                        window.location.href = '/forget'; // Replace with your route
                    });
                });
            </script>
        `);
    }
});
module.exports=router;