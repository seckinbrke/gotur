var express = require('express');
var router = express.Router();
const Order = require('../models/Order');

router.post('/add', (req, res) => {
    const order = new Order(req.body.orderObj)
    order.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})

router.get('/get', (req, res) => {
    Order.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})

module.exports = router;
