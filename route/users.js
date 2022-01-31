var express = require('express');
var userController = require('../controllers/user.js');
var router = express.Router();
 
router.post('/', userController.loginRequired, userController.users);

module.exports = router;