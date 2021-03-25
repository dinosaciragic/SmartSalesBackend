const mongoose = require('mongoose');

const RezervacijaSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    post: {
        type: Object,
        required: true
    }
});

const Rezervacija = mongoose.model('Rezervacija', RezervacijaSchema);

module.exports = Rezervacija;