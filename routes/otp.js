//Otp for signup and login page

const express = require('express');
const router = express.Router();
const fast2sms = require('fast-two-sms');
const otpGenerator = require('otp-generator');
const db = require('../conn');


//Configuring to get values from .env
require('dotenv').config();

//Regex for phone number(Only Indian phone numbers)
let regex = /^[7-9]\d{9}$/

//Regex for checking the leading zeros
let regex2 = /^[1-9][0-9]*$/

//Otp generator function
function otpGeneration() {
    db.collection('otpSent').deleteOne({});
    let otpGenerated = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    if (regex2.test(otpGenerated)) {
        db.collection('otpSent').insertOne({ otp: otpGenerated });
        return;
    } else {
        console.log('zero');
        return otpGeneration();
    }
}


//Function to send sms 
function sendSms(message, number) {
    let response = fast2sms.sendMessage({ authorization: "NtTiZKExs0WY93XmvRplPznA8B2d1S67byQHaFwMGko4IJgUr5U740n1Y8shd6qXGEtROSHZfADMTeuJ", message: message, numbers: [number] })
    response.then(function (message) {
        console.log('Success: ' + JSON.stringify(message));
    }).catch(function (message) {
        console.log('Catch: ', JSON.stringify(message));
    })
}


//otp for registration page
router.post('/otpReg', function (req, res) {
    db.collection('users').find({ number: parseInt(req.body.number) }).toArray(function (err, rows) {
        if (rows == '') {
            if (regex.test(req.body.number)) {
                otpGeneration();
                db.collection('otpSent').find().toArray(function (err, rows) {
                    // console.log('Checking zero: ', rows[rows.length - 1].otp[0]);
                    let otp1 = parseInt(rows[rows.length - 1].otp);
                    //  Sending sms using fast2sms
                    sendSms(`Your otp to register E-commerce website is ${otp1}. Do not share it with anyone.`, req.body.number);
                    res.send({ otpSent: 'sent' });
                })
            } else {
                res.send({ error: 'Incorrect phone number' })
            }
        } else {
            //Sending if number is already registered
            res.send({ registered: 'This number is already registered!' });
        }
    })
})


//otp for login page
router.post('/otpLogin', function (req, res) {
    otpGeneration();
    db.collection('otpSent').find().toArray(function (err, rows) {
        // console.log('Checking zero: ', rows[rows.length - 1].otp[0]);
        // console.log('rows: ', rows[rows.length - 1].otp);
        let otp2 = parseInt(rows[rows.length - 1].otp);
        //  Sending sms using fast2sms
        sendSms(`Your otp to register E-commerce website is ${otp2}. Do not share it with anyone.`, req.body.number);
        res.send({ otpSent: 'sent' });

    })
})

//Sending the otp from database to frontend
router.get('/sendOtp', function (req, res) {
    db.collection('otpSent').find().toArray(function (err, rows) {
        // console.log('frontend',rows[rows.length-1].otp);
        if (rows[rows.length - 1] != '') {
            res.send(rows[rows.length - 1].otp);
        } else {
            res.send('Invalid');
        }
    })
})



module.exports = router;
module.exports.otpGeneration = otpGeneration;