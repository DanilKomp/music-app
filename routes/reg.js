const express = require('express');
const router = express.Router();

const jsonParser = express.json();

const mongoUrl = 'mongodb+srv://app:123@cluster0-rizld.mongodb.net/test?retryWrites=true'
const MongoClient = require('mongodb').MongoClient;

var id = 1;


MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("users");
    console.log('connected')
    //var token = req.body.token.substring(6, req.body.token.length)
    //console.log(token)
    dbo.collection("users").find({}).toArray( function (err, result) {
        if (err) throw err;
        console.log('req succes')
        console.log(result)
        if (result) {
            id = result.length
            }
        })
        db.close();
    });
router.post('/', jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);

    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        //
        dbo.collection("users").findOne({ uname: request.body.uname }, function (err, result) {
            if (err) throw err;
            if (result) {  //каждый человек уникален, вплоть до юзернейма
                console.log(result + ' result') //не идеальный логер, но зато понятно 
                response.json(`Username already registered`);
            }
            else if (!result) {
                      if(request.body){
                        request.body.id = String(id)
                        console.log(request.body)
                        dbo.collection("users").insertOne(request.body, function (err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                            var token = id
                            response.json(`token=${token};`);
                           id++
                        }); db.close();
                      
              
                    }
                    else{
                    }}
                

            
            db.close();
        });

    });

  
});

module.exports = router