var express = require('express');
var userController = require('../controllers/user.js');
var router = express.Router();
 
router.post('/register', userController.register);
router.post('/sign_in', userController.sign_in);

module.exports = router;