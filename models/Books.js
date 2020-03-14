const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    description: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.']
    },
    price: {
        type: Number,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    productPhoto: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    author: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    publisher: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },

});

module.exports = mongoose.model('Book', BookSchema);