const express = require('express');
const Web3 = require('web3');
const fs = require('fs');

const modelProduct = require("../models/products");
const modelSales = require("../models/sales");

const router = express.Router();
const rpc_addr = process.env.RPC_ADDR || "http://localhost:8545";

var web3 = new Web3(new Web3.providers.HttpProvider(rpc_addr));
console.log(rpc_addr);

var jContract = null;
fs.readFile(__dirname + '/../contracts/build/Shop.abi', function (err, file_data) {
    if (err) {
        console.log(err);
        return;
    }
    jContract = new web3.eth.Contract(JSON.parse(file_data.toString()), config.contract);
});

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

router.post('/order/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    req.checkBody("order_id", "This field is required").notEmpty();

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

    modelSales.save(req.params.id, function (result) {
        if (result.status) {
            return res.json({status: 200, data: result.data});
        }
        else {
            return res.json({status: 205, data: result.data});
        }
    });
});

module.exports = router;
