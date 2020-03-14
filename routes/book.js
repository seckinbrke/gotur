var express = require('express');
var router = express.Router();
const Books = require('../models/Books');

router.post('/add', (req, res) => {
    const { name, description, price, productPhoto, author, publisher } = req.body;
    console.log(name)
    const book = new Books({
        name,
        price,
        description,
        productPhoto,
        author,
        publisher
    })
    book.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})
router.get('/get', (req, res) => {
    Books.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})
module.exports = router;