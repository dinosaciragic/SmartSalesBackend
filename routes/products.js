const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const upload = multer({ storage: storage }).array('files', 12);

// Product model
const Product = require('../models/Product');

// api/products/add
router.post('/add', upload('productImage'), (req, res) => {

    const productImage = req.file.path;

    const {
        title,
        description,
        startDate,
        endDate,
        authorId,
        authorName,
        productCategory,
        price,
        website,
        location,
        isKreativac
    } = req.body;

    const newProduct = new Product({
        title,
        description,
        startDate,
        endDate,
        authorId,
        authorName,
        productCategory,
        productImage,
        price,
        website,
        location,
        isKreativac
    });

    // Save product
    newProduct.save().then(product => {
        res.send(product);
    }).catch(err => console.error(err));

});

// api/products?page=1
router.get('/', paginatedResults(Product, false), (req, res) => {
    res.send(res.paginatedResults);
});

// api/products/kreativci?page=1
router.get('/kreativci', paginatedResults(Product, true), (req, res) => {
    res.send(res.paginatedResults);
});


// Pagination middleware
function paginatedResults(model, isKreativac) {
    return async (req, res, next) => {
        const page = req.query.page;
        const search = req.query.searchTerm;
        const limit = 12;
        var regex = new RegExp(search, 'i');  // RegEdp works as contains for find function and 'i' makes it case insensitive
        const startIndex = (page - 1) * limit;

        try {
            const results = await model.find({ isKreativac: isKreativac }).limit(limit).skip(startIndex).exec();
            res.paginatedResults = results;
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }


    }
}

module.exports = router;