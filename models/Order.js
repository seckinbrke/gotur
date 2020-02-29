const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userName: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    userSurname: {
        type: String,
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
    userAddress: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    userCreditCardInfo: {
        type: Array,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    shoppingItems: {
        type: Array,
        required: [true, '`{PATH}` alanı zorunludur.'],
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('order', OrderSchema);