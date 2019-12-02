var express = require('express');
var router = express.Router();
const Products = require('../models/Products');

router.post('/add', (req, res) => {
    console.log(name)
    const product = new Products(req.body)
    product.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})

router.post('/get', (req, res) => {
    const { name } = req.body;
    Products.find({ name: { $options: 'i', $regex: name } }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})

module.exports = router;
