var express = require('express');
var router = express.Router();

var index = require('../controllers/index-controller');

/* GET home page. */
router.get('/', index.index);
router.get('/getindex', index.getIndex);





module.exports = router;
