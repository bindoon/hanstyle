var router = require('express').Router();

var index = require('../controllers/article-controller');

router.get('/artical/:id\.html',index.getArticle);

module.exports = router;
