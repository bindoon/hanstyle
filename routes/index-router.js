var express = require('express');
var router = express.Router();

var index = require('../controllers/index-controller');

/* GET home page. */
router.get('/', index.index);
router.get('/getindex', index.getIndex);




router.get('/insertIndex',index.insertIndex);
router.post('/insertIndex',index.insertIndex);
router.post('/removeIndex',index.removeIndex);

module.exports = router;
