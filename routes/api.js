var express = require('express');
var modelProduct = require("../models/products");

var router = express.Router();

router.get('/products', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var search = req.param('q');

    modelProduct.all({search: search}, function (result) {
        if (result.status) {
            return res.json({status: 200, data: result.data});
        }
        else {
            return res.json({status: 205, data: result.data});
        }
    });
});

router.get('/product/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    modelProduct.get(req.params.id, function (result) {
        if (result.status) {
            return res.json({status: 200, data: result.data});
        }
        else {
            return res.json({status: 205, data: result.data});
        }
    });
});

router.get('/order/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    modelProduct.get(req.params.id, function (result) {
        if (result.status) {
            return res.json({status: 200, data: result.data});
        }
        else {
            return res.json({status: 205, data: result.data});
        }
    });
});

module.exports = router;
