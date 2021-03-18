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
router.post('/add', upload.single('productImage'), (req, res) => {

    const productImage = req.file.path;

    /*  if (req.files) {
         req.files.forEach((item) => {
             productImage.push(item.path)
         })
     } */

    const {
        title,
        description,
        startDate,
        endDate,
        authorId,
        authorName,
        productCategory,
        subCategory,
        oldPrice,
        newPrice,
        stock
    } = req.body;

    const newProduct = new Product({
        title,
        description,
        startDate,
        endDate,
        authorId,
        authorName,
        productCategory,
        subCategory,
        oldPrice,
        newPrice,
        productImage,
        stock
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
router.get('/', paginatedResults(Product), (req, res) => {
    res.send(res.paginatedResults);
});

// api/products/all?page=1
router.get('/all', paginatedAll(Product), (req, res) => {
    res.send(res.paginatedResults);
});

// Pagination middleware
function paginatedAll(model) {
    return async (req, res, next) => {
        try {
            const results = await model.find();
            res.paginatedResults = results;
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

// Pagination middleware
function paginatedResults(model) {
    return async (req, res, next) => {
        const page = req.query.page;
        const search = req.query.searchTerm;
        const productCategory = req.query.productCategory;
        const subCategory = req.query.subCategory;
        const limit = 12;
        var regex = new RegExp(search, 'i');  // RegEdp works as contains for find function and 'i' makes it case insensitive
        const startIndex = (page - 1) * limit;

        try {
            if (productCategory) {
                if (subCategory) {
                    const results = await model.find({ title: regex, productCategory: productCategory, subCategory: subCategory }).limit(limit).skip(startIndex).exec();

                    res.paginatedResults = results;
                    next();
                } else {
                    const results = await model.find({ title: regex, productCategory: productCategory }).limit(limit).skip(startIndex).exec();

                    res.paginatedResults = results;
                    next();
                }

            } else {
                const results = await model.find({ title: regex }).limit(limit).skip(startIndex).exec();
                const authorResults = await model.find({ authorName: regex }).limit(limit).skip(startIndex).exec();
                const allResults = results.concat(authorResults);
                const finalResults = [];
                for (let i = 0; i < allResults.length; i++) {
                    if (finalResults.length == 0) {
                        finalResults.push(allResults[i]);
                    } else {
                        var found = false;
                        for (let j = 0; j < finalResults.length; j++) {
                            if (JSON.stringify(allResults[i]) === JSON.stringify(finalResults[j])) {
                                found = true;
                            }
                        }

                        if (!found) {
                            finalResults.push(allResults[i]);
                        }
                    }
                }

                res.paginatedResults = finalResults;
                next();
            }


        } catch (error) {
            res.status(500).json({ message: error.message });
        }


    }
}

module.exports = router;