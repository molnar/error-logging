// grab the packages we need
var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost"); //add port number if needed, ex.  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes will go here

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);



app.get('/app/errors', function(req, res) {
  res.send('Nothing to see here');
});


app.post('/app/errors', function(req, res) {
   
    var errorObj = req.body;
    //now do something with it
    console.log(errorObj)

   

    res.send("Successfully submitted error");
});