const express = require("express");
const app = express();
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Login page
const login = require('./routes/login');
app.use('/',login);

//Signup page
const signup = require('./routes/signup');
app.use('/',signup);

//OTP
const otp = require('./routes/otp');
app.use('/',otp);


app.listen(5000,function(){
    console.log('Running on port 80...');
});

module.exports = app;