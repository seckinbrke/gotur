const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    price: {
        type: Number,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    productPhoto: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    subType: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    mainType: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },

});

module.exports = mongoose.model('product', ProductSchema);