var express = require('express');
var router = new express.Router();
const auth = require('../middleware/auth')

const User = require('../models/User');

//SignUp
router.post('/create', async (req, res) => {
    const user = new User(req.body)
    console.log(user)
    try {
        await user.save()
        user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.send(error)
    }
})
//SignIn
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})
//Logout
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
//Email Check
router.post('/emailcheck', (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email }).then((user) => {
        if (user) {
            res.json(true);
        } else {
            res.json(false);
        }
    }).catch(() => {
        res.json(null);
    })
});

router.put('/updateCardInfo/:id', (req, res) => {
    User.findByIdAndUpdate(req.body._id, {
        creditCardNo: req.body.creditCardNo,
        creditCardDate: req.body.creditCardDate,
        creditCardCvc: req.body.creditCardCvc,
        creditCardNameSurname: req.body.creditCardNameSurname
    },{
        multi: true
    }, (err, data) => {
        if(err){
            res.send(err)
        }
        res.json(data)
    })
})


module.exports = router;
