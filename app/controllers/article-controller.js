var dataHandle = require('../biz/dataHandle');
var co = require('co');

exports.getArticle = function(req, res, next) {

    var articleid = req.params.id;

    co(function* (){
        
        var article =  yield dataHandle.getArticleById(articleid);
        if(article) {
            article = article[0];
            var expert = yield dataHandle.getExpert(article.expertId);
            if (expert) {
                expert = expert[0];
                var category  = yield dataHandle.getCategory(expert.cateId);
                if(category) {
                    article.typename = category[0].name
                }
            };
        }
        return article;

    }).then(function(data){
        if(data)
        res.render("article",data);
        else res.render("error",{});
    });

    return;
}