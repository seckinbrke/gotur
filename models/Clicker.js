const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClickerSchema = new Schema({
    username: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    score : {
        type: Number,
        required: [false, '`{PATH}` alanı zorunludur.'],
    }

});


module.exports = mongoose.model('clicker', ClickerSchema);