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
        type: String
    },
    endDate: {
        type: String
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
    subCategory: {
        type: String
    },
    productImage: {
        type: Array
    },
    oldPrice: {
        type: Number
    },
    newPrice: {
        type: Number
    },
    likedIds: {
        type: Array
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;