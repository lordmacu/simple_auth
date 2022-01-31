var express = require('express');
var userController = require('../controllers/user.js');
var router = express.Router();
 
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;