exports.index = function(req, res, next) {
  res.render('index', { title: 'Express' });
}


var dataHandle = require('../biz/dataHandle');

exports.getIndex = function(req, res, next) {
    dataHandle.getIndex(function(data){
        res.send(data);
    })
}


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

