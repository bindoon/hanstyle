var dataHandle = require('../biz/dataHandle');
var co = require('co');

exports.getArticle = function(req, res, next) {

    var articleid = req.params.id;

    co(function* (){
        
        return yield dataHandle.getArticleById(articleid);

    }).then(function(data){
        if(data)
        res.render("article",data[0]);
        else res.render("error",{});
    });

    return;
}