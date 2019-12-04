var express = require('express');
var router = express.Router();
const Products = require('../models/Products');

router.post('/add', (req, res) => {
    const { name, price, productPhoto, subType, mainType } = req.body;
    console.log(name)
    const product = new Products({
        name,
        price,
        productPhoto,
        subType,
        mainType
    })
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
