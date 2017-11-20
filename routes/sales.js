var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('orders/index', { title: 'Orders' });
});

router.get('/view', function(req, res, next) {
    res.render('orders/view', { title: 'Order Detail' });
});

router.post('/view', function(req, res, next) {
    res.render('orders/view', { title: 'Order Detail' });
});

module.exports = router;
