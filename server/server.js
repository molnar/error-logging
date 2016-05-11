// grab the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile')
var db = require('./db.js');
var file = 'data.json'
var errors = [];


var app = express();
var port = process.env.PORT || 4017;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost"); //add port number if needed, ex.  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);



app.get('/app/errors', function(req, res) {
  //res.send('Nothing to see here');


  db.initialize(function(err,data){
    if(!err){
      data.find({ url: 'http://localhost/error-logging/trunk/' }, function (err, docs) {       
        res.send(docs);        
      });
    }else{
      console.log("error")
    }
  })
});


app.post('/app/errors', function(req, res) {   
    var errorObj = req.body;

    db.initialize(function(err,data){
      if(!err){        
        data.insert(errorObj, function (err, newDoc) {
          console.log(newDoc._id)
        })
        /*data.find({ url: 'http://localhost/error-logging/trunk/' }, function (err, docs) {
          console.log(docs)
          // docs is an array containing documents Mars, Earth, Jupiter
          // If no document is found, docs is equal to []
        });*/
      }else{
        console.log("error")
      }
    })
    res.send("Successfully submitted error");
});


