var router = require('express').Router();

var index = require('../controllers/dashboard-controller');

router.get('/insertIndex',index.insertIndex);
router.post('/insertIndex',index.insertIndex);
router.post('/removeIndex',index.removeIndex);


module.exports = router;
