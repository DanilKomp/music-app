const express = require('express');
const app = express();
const port = 3000;


const jsonParser = express.json();

//db
const mongoUrl = 'mongodb+srv://app:123@cluster0-rizld.mongodb.net/test?retryWrites=true'
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw err;
    console.log("Database connected!");
    db.close();
});


//using hbs
app.set("view engine", "hbs");
app.use(express.static('public'));
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//Home
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


app.route('/', jsonParser)
    .get((req, res) => {

        res.sendFile(__dirname+'/views/index.html')

    })//  end get


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//Auth
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/auth", jsonParser, (req, res) => {
    res.sendFile(__dirname + '/views/auth.html')
})

app.use('/reg', jsonParser, require('./routes/reg'));

app.use('/login', jsonParser, require('./routes/login'))
app.get('/logout', (req,res)=>{
    res.sendFile(__dirname+'/views/logout.html')
})
app.post('/userdata', jsonParser, (req, res)=>{
console.log(req.body.token.substring(6, req.body.token.length))
MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw err;
    var dbo = db.db("users");
    console.log('connected')
    var token = req.body.token.substring(6, parseInt(req.body.token.length))
    console.log(token)
    dbo.collection("users").findOne({ id: String(token)  }, function (err, result) {
        if (err) throw err;
        console.log('req succes')

        console.log(result)
        if (result) {
            
            console.log(result)
               res.json(result);
            }
        })
        db.close();
    });

});

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//listen
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`\n port ${port}\n`)
})