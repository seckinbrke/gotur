const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        trim: true
    },
    surname: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        trim: true
    },
    password: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Invalid password, try again')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: [true, '`{PATH}` alanı zorunludur.'],
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    address: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    phoneNumber: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        unique: true,
        minlength: 11,
        maxlength: 11
    },
    creditCardNo: {
        type: Number,
        required: false,
        minlength: 16,
        maxlength: 16,
        trim: true
    },
    creditCardDate: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 5,
        trim: true
    },
    creditCardCvc: {
        type: Number,
        required: false,
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
},{
    timestamps: true
});


UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject

}

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'ardaberkseckin')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Email or password wrong!')
    }
    return user
}

//Hash the plain text password before saving
UserSchema.pre('save', async function (next) {
    const user = this;
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
const User = mongoose.model('user', UserSchema)
module.exports = User