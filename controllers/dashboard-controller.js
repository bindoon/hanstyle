/*
*   控制台类
*/

var dataHandle = require('../biz/dataHandle');



exports.insertIndex = function(req, res, next) {
    if (req.method.toLowerCase() == 'post') {
        var data = req.getParamObject();

        dataHandle.insertIndex(data,function(){
            res.send(data);
        })

        return;
    }
    
    dataHandle.getIndex(function(data){
        res.render('insertindex',data);
    })
}

exports.removeIndex = function(req, res, next) {
    dataHandle.removeData(req.getParam('id'), function(data){
        res.send({code:0});
    })
}
