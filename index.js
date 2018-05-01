const express = require("express");
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/userdb');
mongoose.Promise = global.Promise;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist/'));


//initialize routes
 app.use('/api', routes);

//error handling middleware
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({
    error: err.message
  })
})


//listen for requests
app.listen(process.env.port || 4000, function(){
  console.log("Listening on 4000...")
})
