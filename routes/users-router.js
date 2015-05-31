var express = require('express');
var router = express.Router();

var users = require('../controllers/users-controller');

/* GET users listing. */
router.get('/getuserinfo', users.getUserInfo);


module.exports = router;
