'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = mongoose.model('User');
  require('dotenv').config();


exports.register = function(req, res) {
    var newUser = new User(req.body);
  
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
    });
  };


  exports.login = function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, process.env.SECRETKEY) });
    });
  };

exports.loginRequired = function(req, res, next) {
    //if user is authorized can do the request
  if (req.user) {
    next();
  } else {
    //if user is not Unauthorized show an error 

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};

exports.users = function(req, res, next) {
  if (req.user) {
    //get all users
    User.find({}).then(function (users) {
        return res.json({ users: users });
    });
    
  } 
  else {
   return res.status(401).json({ message: 'Invalid token' });
  }
};