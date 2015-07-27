var dataHandle = require('../biz/dataHandle');
var co = require('co');

exports.getCategory = function(req, res, next) {

    var cateid = req.getParam('cateid');


    co(function* (){
        var response = {};

        var mainInfo = yield dataHandle.getCategory(cateid);
        var experts = yield dataHandle.getExpertsByCateId(cateid);
        //var articals = yield dataHandle.getArticalByCateId(cateid);

        response.result = {
            main:mainInfo,
            expert:experts
        };

        return response;

    }).then(function(data){
        res.send(data);
    });

    return;
    res.send(
{
    "result":{
        "main":{
            "name":"茶道",
            "pic":"http://hxd.wenming.cn/tszg/attachement/jpg/site2/20090311/001d7d753a6a0b214e9633.jpg",
            "desc":"      茶道亦被视为一种烹茶饮茶的生活艺术，一种以茶为媒的生活礼仪，一种以茶修身的生活方式。它通过沏茶、赏茶、闻茶、饮茶、增进友谊，美心修德，学习礼法，领略传统美德，是很有益的一种和美仪式。"       
        },
        "banner":[
            {
                "pic":"http://www.dabaoku.com/sucaidatu/shenghuo/chadao/11046110.jpg",
                "url":"http://hxd.wenming.cn/tszg/2009-03/11/content_28696.htm",
                "title":"茶道"
            },
            {
                "pic":"http://hxd.wenming.cn/tszg/attachement/jpg/site2/20090311/001d7d753a6a0b214e8224.jpg",
                "url":"http://www.nipic.com/show/5222645.html",
                "title":"茶道1"
            },
            {
                "pic":"http://hxd.wenming.cn/tszg/attachement/jpg/site2/20090311/001d7d753a6a0b214e8f2d.jpg",
                "url":"http://www.douban.com/event/21039992/",
                "title":"茶道2"
            }
        ],
        "experts": [
            {
                "pic":"http://img1.imgtn.bdimg.com/it/u=2915743927,1173774972&fm=21&gp=0.jpg",
                "title":"千万顾景舟紫砂引领匡时紫砂专场",
                "desc":"",
                "date":"2015-3-4",
                "url":"http://www.zisha360.com/news/show/169114.shtml"
            },
            {
                "pic":"http://tea.sun0769.com/cdcy/cj/W020110629357554216857.jpg",
                "title":"著名茶文化专家寇丹.-紫砂文化的软肋",
                "desc":"",
                "date":"2015-3-3",
                "url":"http://www.zisha360.com/news/show/169116.shtml"
                
            }            
        ],
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

