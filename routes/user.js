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
    const {email} = req.body;
    User.findOne({email: email}).then((user) => {
        if (user) {
            res.json(true);
        } else {
            res.json(false);
        }
    }).catch(() => {
        res.json(null);
    })
});
//Credit Card Update
router.patch('/updateCardInfo', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['creditCardNo','creditCardDate','creditCardCvc','creditCardNameSurname']

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.send({error: 'Invalid updates'})
    }
    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.send()
    }
})


module.exports = router;
