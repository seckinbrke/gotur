const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userName: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    userSurname: {
        type: Number,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    userId: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    userPhoneNumber: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    productAdress: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    productPrice: {
        type: Number,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    productPhoto: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    productSubType: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    productMainType: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },

});

module.exports = mongoose.model('order', OrderSchema);