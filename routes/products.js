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
const upload = multer({ storage: storage });

// Product model
const Product = require('../models/Product');

// api/products/add
router.post('/add', upload.array('productImage'), (req, res) => {

    const productImage = []

    if (req.files) {
        req.files.forEach((item) => {
            productImage.push(item.path)
        })
    }

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
        email,
        contactNumber,
        instagram,
        facebook,
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
        email,
        contactNumber,
        instagram,
        facebook,
        isKreativac
    });

    // Save product
    newProduct.save().then(product => {
        res.send(product);
    }).catch(err => console.error(err));

});

// api/products/edit/id
router.put('/edit/:id', async (req, res, next) => {

    Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then((updatedProduct) => {
        res.send({ updatedProduct: true });
    });

});


// api/products?page=1
router.get('/', paginatedResults(Product, false), (req, res) => {
    res.send(res.paginatedResults);
});

// api/products/kreativci?page=1
router.get('/kreativci', paginatedResults(Product, true), (req, res) => {
    res.send(res.paginatedResults);
});

// api/products/all?page=1
router.get('/all', paginatedAll(Product), (req, res) => {
    res.send(res.paginatedResults);
});

// Pagination middleware
function paginatedAll(model) {
    return async (req, res, next) => {
        const page = req.query.page;
        const search = req.query.searchTerm;
        const limit = 12;
        var regex = new RegExp(search, 'i');  // RegEdp works as contains for find function and 'i' makes it case insensitive
        const startIndex = (page - 1) * limit;

        try {
            const results = await model.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = results;
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }


    }
}

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