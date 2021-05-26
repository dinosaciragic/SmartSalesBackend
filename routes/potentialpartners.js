const express = require('express');
const router = express.Router();
// PotentialPartner model
const PotentialPartner = require('../models/PotentialPartner');


// api/PotentialPartners/add
router.post('/add', (req, res) => {

    const {
        email,
        companyName,
        contactNumber
    } = req.body;

    const newPotentialPartner = new PotentialPartner({
        email,
        companyName,
        contactNumber
    });

    // Save PotentialPartner
    newPotentialPartner.save().then(PotentialPartner => {
        res.send(PotentialPartner);
    }).catch(err => console.error(err));

});


module.exports = router;