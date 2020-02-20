const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect('mongodb+srv://getir:seckinbrke123@getir-oend6.mongodb.net/test?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });
};

//mongodb+srv://getir:seckinbrke123@getir-oend6.mongodb.net/test?retryWrites=true&w=majority'
//mongodb://127.0.0.1:27017/task-manager-api