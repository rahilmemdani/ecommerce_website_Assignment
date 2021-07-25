//Connecting mongodb with nodejs

const mongoose = require("mongoose");

mongoose.connect('mongodb://mongo:27017/ecommerce', { useUnifiedTopology: true, useNewUrlParser: true }, function (err) {
    if (!err) {
        // console.log('Successful');
    } else {
        console.log('Unsuccessful');
    }
})

mongoose.connection.createCollection('users');
mongoose.connection.createCollection('otpSent');

module.exports = mongoose.connection;
