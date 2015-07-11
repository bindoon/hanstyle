exports.index = function(req, res, next) {
  res.render('index', { title: 'Express' });
}


var dataHandle = require('../biz/dataHandle');

exports.getIndex = function(req, res, next) {
    dataHandle.getIndex(function(data){
        res.send(data);
    })
}


