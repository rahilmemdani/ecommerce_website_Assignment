//Login page api


const express = require('express');
const router = express.Router();
const db = require('../conn');



//Login credentials
router.post('/loginCred', function (req, res) {
    db.collection('users').find({ number: parseInt(req.body.number) }).toArray(function (err, rows) {
        if (rows == '') {
            res.json({ msgs: 'This number is not registered' })
        } else if (rows != '') {
            res.json({ registered: 'Number is registered' })
        }
    })
})



module.exports = router;