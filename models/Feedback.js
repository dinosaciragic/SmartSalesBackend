const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;