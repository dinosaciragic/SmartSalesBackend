const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../shared/constants');
// PotentialPartner model
const PotentialPartner = require('../models/PotentialPartner');


// api/PotentialPartners/add
router.post('/add', (req, res) => {
    console.log('zasto', req.body)
    const {
        email,
        contactNumber
    } = req.body;

    const newPotentialPartner = new PotentialPartner({
        email,
        contactNumber
    });

    // Save PotentialPartner
    newPotentialPartner.save().then(PotentialPartner => {
        res.send(PotentialPartner);
    }).catch(err => console.error(err));

});


module.exports = router;