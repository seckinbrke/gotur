var express = require('express');
var router = express.Router();
const Clicker = require('../models/Clicker');

//Username score ekleme
router.post('/add', (req, res) => {
    const { username } = req.body;
    const clicker = new Clicker({
        username:username,
        score:null
    })
    clicker.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    })
})


//Username score cagirma
router.get('/get', (req, res) => {
    Clicker.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})
//Username update
router.put('/updateScore/:id', (req, res) => {
    //
    Clicker.findByIdAndUpdate(req.body._id, {
        score: req.body.score,
    },{
        multi: false
    }, (err, data) => {
        if(err){
            res.send(err)
        }
        res.json(data)
    })
})

module.exports = router;