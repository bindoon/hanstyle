var router = require('express').Router();

var index = require('../controllers/article-controller');

router.get('/article/:id',index.getArticle);

module.exports = router;
