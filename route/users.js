var express = require('express');
var userController = require('../controllers/user.js');
var router = express.Router();
 
//get all users /users
router.post('/', userController.loginRequired, userController.users);

module.exports = router;