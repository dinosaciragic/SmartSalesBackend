const e = require('express');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
// User model
const User = require('../models/User');

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'smartsalesbih@gmail.com',
        pass: 'smartsales12345678'
    }
});

// api/email/forgotpassword
router.post('/forgotpassword', async (req, res) => {
    let errors = [];

    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
        errors.push({ msg: 'Email or password is incorrect' }); // Add email or password is incorrect once tested DS 08.02.2020.
        res.send(errors);
    } else {
        var mailOptions = {
            from: 'smartsalesbih@gmail.com',
            to: req.body.email,
            subject: 'Forgot password',
            text: `Your password is ` + user.savePassAsPlainText
        }

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                res.send({ msg: "We sent your password to your email" });
            }
        });
    }
});


module.exports = router;