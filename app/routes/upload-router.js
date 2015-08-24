var oss = require('../controllers/upload-controller');

var router = require('express').Router();
router.post('/imageupload', oss.imageupload);
router.get('/imageupload', oss.imageupload);

module.exports = router;
