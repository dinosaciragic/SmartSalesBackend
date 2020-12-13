const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    productImage: {
        type: String
    },
    price: {
        type: Number
    },
    website: {
        type: String
    },
    // Kreativac = true, Not Kreativac = false
    isKreativac: {
        type: Boolean,
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;