const express = require("express");

const router = express.Router();
const User = require("../models/user");

//get a list of users from the db
router.get('/users', function(req, res, next){
  //res.send({type: 'GET'});
  User.find({})
  .then(function(users){
    res.send(users)
  });
});

//add a new user to the db
router.post('/users', function(req, res, next){
  // var user = new User(req.body);
  // user.save() instead we use create method for both

  User.create(req.body).then(function(user){
    res.send(user);
  }).catch(next);
  
  // res.send({
  //   type: 'POST',
  //   name: req.body.name,
  //   password: req.body.password
  // });
});


//update a user in the db
router.put('/users/:id', function(req, res, next){
  //res.send({type: 'PUT'});
  User.findByIdAndUpdate({_id:req.params.id}, req.body)
  .then(function(){
    User.findOne({_id:req.params.id})
      .then(function(user){
      res.send(user);
    });
  });
});


//delete a user from the db
router.delete('/users/:id', function(req, res, next){

  //console.log(req.params.id);
  //res.send({type: 'DELETE'});

  User.findByIdAndRemove({_id:req.params.id})
  .then(function(user){
    res.send(user)
  });

});

module.exports = router;
