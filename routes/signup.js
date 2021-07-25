//Signup page api

const express = require('express');
const router = express.Router();
//Connection to database
const db = require('../conn');

//Regex for email
let regex = /^([a-zA-Z0-9\.-_]+)@([0-9a-z-]{2,20}).([a-z]{2,8})(.[a-z]{2,8})$/

//Routes
router.post("/signUp", function (req, res) {
    db.collection('users').find({ number: parseInt(req.body.number) }).toArray(function (err, rows) {
        if (rows != '') {
            res.send({ inserted: false });
        } else {
            db.collection('users').find({ email: req.body.email }).toArray(function (err, rows) {
                if (rows != '') {
                    res.send({ exist: 'Already Exists' });
                } else {
                    if (regex.test(req.body.email)) {
                        db.collection('users').insertOne({ number: parseInt(req.body.number), email: req.body.email, name: req.body.name }, function (err, rows) {
                            res.send({ inserted: true });
                        })
                    } else {
                        res.send({ email: false });
                    }
                }
            })
        }
    })
})


module.exports = router;