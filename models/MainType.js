const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MainTypeSchema = new Schema({
    mainType: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    },
    typePhoto : {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
    }

});

module.exports = mongoose.model('mainType', MainTypeSchema);