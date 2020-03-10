var express = require('express');
var router = express.Router();
const MainType = require('../models/MainType');

router.post('/add', (req, res) => {
    const { mainType, typePhoto } = req.body;
    const maintype = new MainType({
        mainType,
        typePhoto
    })
    maintype.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})

router.get('/get', (req, res) => {
    MainType.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})


module.exports = router;
