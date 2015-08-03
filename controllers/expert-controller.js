var dataHandle = require('../biz/dataHandle');
var co = require('co');

exports.getExpert = function(req, res, next) {
    var expertid = req.getParam('expertid');


    co(function* (){
        var response = {};

        var info = yield dataHandle.getExpert(expertid);
        var main = yield dataHandle.getCategory(info[0].cateId);

        var articles = [];//yield dataHandle.getExpertsByCateId(expertid);

        response.result = {
            main:main[0],
            info:info[0],
            article:articles
        };

        return response;

    }).then(function(data){
        res.send(data);
    });
    return;

    res.send({
    "result":{
        "main":{
            "name":"陈文华",
            "pic":"http://c.cnfolimg.com/20140521/83/960056130704238339.jpg",
            "desc":"      茶道亦被视为一种烹茶饮茶的生活艺术，一种以茶为媒的生活礼仪，一种以茶修身的生活方式。它通过沏茶、赏茶、闻茶、饮茶、增进友谊，美心修德，学习礼法，领略传统美德，是很有益的一种和美仪式。"
        },
        "info":{
            "name":"陈文华",
            "pic":"http://c.cnfolimg.com/20140521/83/960056130704238339.jpg",
            "desc":"著名茶文化专家陈文华教授"
        },
        "videos":[
            {
                "title":"《美丽课堂》第二十一期 小新“日本之道”探寻之旅—茶道",
                "desc":"茶道 2015",
                "pic":"http://img3.douban.com/view/event_poster/raw/public/0684f241a776dde.jpg",
                "url":"http://www.tudou.com/programs/view/l3EJ6WwbAck/",
                "duration":123,
                "date":"2015-5-7"
            },
            {
                "title":"茶道艺术",
                "desc":"茶道 2015",
                "pic":"http://www.diaosu.cn/UserFiles/2011-11/0921232450665.jpg",
                "url":"http://v.youku.com/v_show/id_XNDA1OTI0MDAw.html?from=s1.8-1-1.2",
                "duration":123,
                "date":"2015-5-7"
            }
        ],
        /*推荐文章*/
        "articles":[
            {
                "title":"沉痛哀悼著名茶文化专家陈文华教授逝世",
                "url":"http://haixi.cnfol.com/chaye/20140521/17921785.shtml"
            },
            {
                "title":"茶道茶具专家浅析:如何使用十四种常见茶具?",
                "url":"http://www.sdchaju.com/ask_630.html"
            },                    
            {
                "title":"日茶道专家:日本茶道注重为别人着想",
                "url":"http://biz.ifeng.com/huanan/detail_2011_11/07/102099_0.shtml"
            },
            {
                "title":"茶艺教程专家谈茶艺与茶道的不同?",
                "url":"http://www.douban.com/note/456020053/?type=like"
            }                     
        ]

    }
});
}

