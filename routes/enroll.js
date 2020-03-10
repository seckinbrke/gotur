var express = require('express');
var router = express.Router();
const MainType = require('../models/MainType');
const Product = require('../models/Products');

router.post('/getCategoryItems', (req, res) => {
    const { mainType } = req.body;
    Product.find({ mainType }).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})
router.post('/getSubTypes', (req, res) => {
    const { mainType } = req.body;
    let subArr = []
    Product.find({ mainType }).then((data) => {
        data.map(item => {
            return subArr.push(item.subType)
            
        })  
        res.json([...new Set(subArr)])
    }).catch((err) => {
        res.json(err)
    })
})
router.post('/getFilteredItem', (req, res) => {
    const { mainType, name } = req.body;
    Product.find({ mainType, name: { $options: 'i', $regex: name } }).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})

module.exports = router;