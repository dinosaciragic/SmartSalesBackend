const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isCompany: {
        type: Boolean,
        required: true
    },
    companyType: {
        type: String
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;