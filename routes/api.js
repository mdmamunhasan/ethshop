var express = require('express');
var modelProduct = require("../models/products");

var router = express.Router();

router.get('/products', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    modelProduct.all({}, function (result) {
        if (result.status) {
            return res.json({status: 200, data: result.data});
        }
        else {
            return res.json({status: 205, data: result.data});
        }
    });
});

module.exports = router;
