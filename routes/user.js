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
//Credit Card Update
// router.patch('/updateCardInfo/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['creditCardNo', 'creditCardDate', 'creditCardCvc', 'creditCardNameSurname']

//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update)
//     })
//     if (!isValidOperation) {
//         return res.send({ error: 'Invalid updates' })
//     }
//     try {
//         updates.forEach((update) => {
//             req.user[update] = req.body[update]
//         })
//         await req.user.save()
//         res.json(req.user)
//     } catch (error) {
//         res.send()
//     }
// })
//Credit Card Update
// router.patch('/updateCardInfo/:id', (req, res) => {
//     User.findById(req.params._id, (error, user) => {
//         if(req.body._id){
//             delete req.body._id;
//         }
//         for( let b in req.body ){
//             user[b] = req.body[b];
//         }
//         user.save()
//         res.json(user)
//     })
// })
// router.put('/updateCardInfo/:id', (req, res) => {
//     User.findById(req.params._id, (err, user) => {
//         user.creditCardNo = req.body.creditCardNo
//         user.creditCardDate = req.body.creditCardDate
//         user.creditCardCvc = req.body.creditCardCvc
//         user.creditCardNameSurname = req.body.creditCardNameSurname
//         user.save()
//         res.json(user)
//     })
// })
// router.put('/updateCardInfo/:id', (req, res) => {
//     const userId = req.params._id
//     const keys = Object.keys(req.body)

//     //const user = User.findById(userId)

//     keys.forEach(key => {
//         req.user[key] = req.body[key]
//     })
//     req.user.save()
//     res.json()


// })
router.put('/updateCardInfo/:id', (req, res) => {
    User.updateOne(req.body._id, {
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
        res.json({
            message: 'User information updated'
        })
    })
})


module.exports = router;
