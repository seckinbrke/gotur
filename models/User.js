const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    surname: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    password: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    email: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    adress: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    phoneNumber: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    creditCardNo: {
        type: Number,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    creditCardDate: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    creditCardCvc: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    }
});

module.exports = mongoose.model('user', UserSchema);