const mongoose = require('mongoose');

const PotentialPartnerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    }
});

const PotentialPartner = mongoose.model('PotentialPartner', PotentialPartnerSchema);

module.exports = PotentialPartner;