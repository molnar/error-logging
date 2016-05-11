// grab the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile')
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
  res.send('Nothing to see here');
});


app.post('/app/errors', function(req, res) {
   
    var errorObj = req.body; 

    jsonfile.readFile(file, function(err, obj) {
      errors = obj;  
      errors.errors.push(errorObj);
      
      jsonfile.writeFile(file, errors, function (err) {
        console.error(err)
      })   
    
    })

    res.send("Successfully submitted error");
});


