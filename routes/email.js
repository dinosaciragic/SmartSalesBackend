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
        errors.push({ msg: 'There is no user with this email' });
        res.send(errors);
    } else {
        var mailOptions = {
            from: 'smartsalesbih@gmail.com',
            to: req.body.email,
            subject: 'Zaboravljena lozinka',
            text: `Vaša lozinka je: ` + user.savePassAsPlainText + ` 
            Ukoliko niste Vi zatražili isporuku zaboravljene lozinke, molimo zanemarite ovaj e-mail.`
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