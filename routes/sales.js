var express = require('express');
var modelSale = require("../models/sales");

var router = express.Router();

router.get('/', function(req, res, next) {
    modelSale.all({}, function (result) {
        if (result.status) {
            res.render('sales/index', {title: 'Sales', sales: result.data});
        }
        else {
            res.render('error', {title: 'Sales', message: result.data.message, error: result.data});
        }
    });
});

router.get('/view/:id', function(req, res, next) {
    res.render('sales/view', { title: 'Sale Detail' });
});

module.exports = router;
