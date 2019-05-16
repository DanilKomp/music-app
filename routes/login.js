const express = require('express');
const router = express.Router();

const jsonParser = express.json();

const mongoUrl = 'mongodb+srv://app:123@cluster0-rizld.mongodb.net/test?retryWrites=true'
const MongoClient = require('mongodb').MongoClient;

router.post('/', jsonParser, (req, res) => {
    console.log(req.body+'login')
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        //
        dbo.collection("users").findOne({ uname: req.body.uname }, function (err, result) {
            if (err) throw err;
            if (result) {  //каждый человек уникален, вплоть до юзернейма
                console.log(result) //не идеальный логер, но зато понятно 
                var token = result.id
                if (result.password == req.body.password) {
                    res.json(`token=${token}`);
                }
                else {
                    res.json(`incorrect password`);
                }
            }
            else if (!result) {

                res.json(`not registered`);

            }
            db.close();
        });

    });
})

module.exports = router