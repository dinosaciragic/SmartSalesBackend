const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../shared/constants');
// feedback model
const Feedback = require('../models/Feedback');


// api/feedback/add
router.post('/add', (req, res) => {

    const {
        text
    } = req.body;

    const newFeedback = new Feedback({
        text
    });

    // Save Feedback
    newFeedback.save().then(Feedback => {
        res.send(Feedback);
    }).catch(err => console.error(err));

});


module.exports = router;