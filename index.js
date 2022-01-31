'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,

  User = require('./models/user'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");
  var auth = require('./route/auth');
  var users = require('./route/users');
  require('dotenv').config();

const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(process.env.URLMONGO, option).then(function(){
    console.log("db connected ");
 
}, function(err) {
    console.log("ERROR ",err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//middleware for auth
app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.SECRETKEY, function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

//auth users
app.use( '/auth', auth);

//get users
app.use( '/users', users);

//notfound
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log(' RESTful API server started on: ' + port);

module.exports = app;