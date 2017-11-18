var express = require('express');
var modelProduct = require("../models/products");

var router = express.Router();

router.get('/', function (req, res, next) {
    modelProduct.all({}, function (result) {
        if (result.status) {
            res.render('products/index', {title: 'Products', products: result.data});
        }
        else {
            res.render('error', {title: 'Products', message: result.data.message, error: result.data});
        }
    });
});

router.get('/add', function (req, res, next) {
    res.render('products/form', {title: 'Add Product', action: 'add'});
});

router.post('/add', function (req, res, next) {
    req.checkBody("title", "This field is required").notEmpty();
    req.checkBody("sku", "This field is required").notEmpty();
    req.checkBody("details", "This field is required").notEmpty();
    req.checkBody("price", "This field is required").notEmpty();
    req.checkBody("stock", "This field is required").notEmpty();
    req.checkBody("brand", "This field is required").notEmpty();
    req.checkBody("category", "This field is required").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('products/form', {title: 'Add Product', error: errors, action: 'add'});
    }

    var data = {
        title: req.body.title,
        sku: req.body.sku,
        details: req.body.details,
        price: req.body.price,
        stock: req.body.stock,
        brand: req.body.brand,
        category: req.body.category,
        is_published: (req.body.is_published) ? 1 : 0
    }

    if (req.body.model) {
        data['model'] = req.body.model
    }

    if (req.body.image) {
        data['image'] = req.body.image
    }

    modelProduct.save(data, function (result) {
        if (result.status) {
            res.redirect('/products/edit/' + result.data.id);
        }
        else {
            res.render('error', {title: 'Add Product', message: result.data.message, error: result.data});
        }
    });
});

router.get('/edit/:id', function (req, res, next) {
    modelProduct.get(req.params.id, function (result) {
        if (result.status) {
            res.render('products/form', {
                title: 'Edit Product',
                product: result.data,
                action: 'edit/' + result.data.id
            });
        }
        else {
            res.render('error', {title: 'Edit Product', message: result.data.message, error: result.data});
        }
    });
});

router.post('/edit/:id', function (req, res, next) {
    req.checkParams("id", "This field is required").notEmpty();
    req.checkBody("sku", "This field is required").notEmpty();
    req.checkBody("details", "This field is required").notEmpty();
    req.checkBody("price", "This field is required").notEmpty();
    req.checkBody("stock", "This field is required").notEmpty();
    req.checkBody("brand", "This field is required").notEmpty();
    req.checkBody("category", "This field is required").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render('products/form', {title: 'Edit Product', error: errors, action: 'edit/' + data.id});
    }

    var data = {
        id: req.params.id,
        title: req.body.title,
        sku: req.body.sku,
        details: req.body.details,
        price: req.body.price,
        stock: req.body.stock,
        brand: req.body.brand,
        category: req.body.category,
        is_published: (req.body.is_published) ? 1 : 0
    }

    if (req.body.model) {
        data['model'] = req.body.model
    }

    if (req.body.image) {
        data['image'] = req.body.image
    }

    modelProduct.save(data, function (result) {
        if (result.status) {
            res.redirect('/products');
        }
        else {
            res.render('error', {title: 'Edit Product', message: result.data.message, error: result.data});
        }
    });
});

router.get('/delete/:id', function (req, res, next) {
    modelProduct.delete(req.params.id, function (result) {
        if (result.status) {
            res.redirect('/products');
        }
        else {
            res.render('error', {title: 'Delete Product', message: result.data.message, error: result.data});
        }
    });
});

module.exports = router;
