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
    companyType: {
        type: String
    },
    companyName: {
        type: String
    },
    companyName: {
        type: String
    },
    description: {
        type: String,
    },
    contactNumber: {
        type: String
    },
    companyImage: {
        type: String
    },
    website: {
        type: String
    },
    instagram: {
        type: String
    },
    facebook: {
        type: String
    },
    followerIds: {
        type: Array
    },
    location: {
        type: String
    },
    postsLeft: {
        type: Number
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;