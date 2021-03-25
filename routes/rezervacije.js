const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../shared/constants');
// Rezervacija model
const Rezervacija = require('../models/Rezervacija');


// api/rezervacije/add
router.post('/add', (req, res) => {
    console.log('zasto rez', req.body)
    const {
        email,
        contactNumber,
        fullName,
        post
    } = req.body;

    const newRezervacija = new Rezervacija({
        email,
        contactNumber,
        fullName,
        post
    });

    // Save Rezervacija
    newRezervacija.save().then(Rezervacija => {
        res.send(Rezervacija);
    }).catch(err => console.error(err));

});


module.exports = router;