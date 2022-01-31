var express = require('express');
var userController = require('../controllers/user.js');
var router = express.Router();
 //register user /auth/register
router.post('/register', userController.register);

 //login user /auth/login
router.post('/login', userController.login);

module.exports = router;