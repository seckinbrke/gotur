var express = require('express');
var router = express.Router();
const Products = require('../models/Products');

router.post('/add', (req, res) => {
    const { name, price } = req.body;
    console.log(name)
    const product = new Products({
        name: name,
        price: price
    })
    product.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})

router.post('/get', (req, res) => {
    const { name } = req.body;
    Products.findOne({ name: {$options: 'i', $regex: name}}).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})

module.exports = router;
