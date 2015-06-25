var dataHandle = require('../biz/dataHandle');

exports.getUserInfo = function(req, res, next) {
    dataHandle.getUserInfo(req.userid,function(data){
        res.send(data);
    })
}
