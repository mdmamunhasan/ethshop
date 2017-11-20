const express = require('express');
const Web3 = require('web3');
const fs = require('fs');

const modelProduct = require("../models/products");
const modelSales = require("../models/sales");

const router = express.Router();
const rpc_addr = process.env.RPC_ADDR || "http://localhost:8545";

var web3 = new Web3(new Web3.providers.HttpProvider(rpc_addr));
console.log(rpc_addr);

var shopContract = null;
fs.readFile(__dirname + '/../contracts/build/Shop.abi', function (err, file_data) {
    if (err) {
        console.log(err);
        return;
    }
    shopContract = new web3.eth.Contract(JSON.parse(file_data.toString()), config.contract);
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

router.get('/process', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    req.checkBody("address", "This field is required").notEmpty();
    req.checkBody("order_id", "This field is required").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return res.json({status: 404, data: errors});
    }

    var address = req.body.address,
        order_id = req.body.order_id;

    shopContract.methods.getOrder(order_id).call({from: address}, function (error, response) {
        if (error) {
            return res.json({status: 205, msg: error.message});
        }

        var params = {
            order_id: order_id,
            cutomer_id: response.customer,
            order_price: response.total_price
        }

        modelSales.save(data, function (result) {
            if (result.status) {
                return res.json({status: 200, data: result.data});
            }
            else {
                return res.json({status: 205, data: result.data});
            }
        });
    });
});

module.exports = router;
