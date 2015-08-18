var router = require('express').Router();

var index = require('../controllers/category-controller');

router.get('/getcategory',index.getCategory);

module.exports = router;
