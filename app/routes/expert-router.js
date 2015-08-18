var router = require('express').Router();

var index = require('../controllers/expert-controller');

router.get('/getexpert',index.getExpert);

module.exports = router;
