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
    endDateAsNum: {
        type: Number
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
        type: Array
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
    discountAmmount: {
        type: Number
    },
    likedIds: {
        type: Array
    },
    stock: {
        type: Number
    },
    uploadDate: {
        type: String
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;