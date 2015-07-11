var dataHandle = require('../biz/dataHandle');

exports.getCategory = function(req, res, next) {
    // dataHandle.getCategory(function(data){
    //     res.send(data);
    // })

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
                "title":"alt"
            },
            {
                "pic":"http://hxd.wenming.cn/tszg/attachement/jpg/site2/20090311/001d7d753a6a0b214e8224.jpg",
                "url":"http://www.nipic.com/show/5222645.html",
                "title":"alt"
            },
            {
                "pic":"http://hxd.wenming.cn/tszg/attachement/jpg/site2/20090311/001d7d753a6a0b214e8f2d.jpg",
                "url":"http://www.douban.com/event/21039992/",
                "title":"alt"
            }
        ],
        "expert": [
            {
                "pic":"http://img1.imgtn.bdimg.com/it/u=2915743927,1173774972&fm=21&gp=0.jpg",
                "articals":[
                    {
                        "title":"千万顾景舟紫砂引领匡时紫砂专场",
                        "url":"http://www.zisha360.com/news/show/169114.shtml"
                    },
                    {
                        "title":"茶道专家《锋尚之王》解读茶道品人生",
                        "url":"http://zixun.hunantv.com/hntv/20101026/791179.html"
                    }                    
                ]
            },
            {
                "pic":"http://tea.sun0769.com/cdcy/cj/W020110629357554216857.jpg",
                "articals":[
                    {
                        "title":"著名茶文化专家寇丹.-紫砂文化的软肋",
                        "url":"http://www.zisha360.com/news/show/169116.shtml"
                    },
                    {
                        "title":"专家论“万里茶道上的中俄历史建筑”|茶道|茶文化_凤凰资讯",
                        "url":"http://news.ifeng.com/a/20141123/42547406_0.shtml"
                    }                    
                ]
            }            
        ],
        "articals":[
            {
                
                "articals":[
                    {
                        "title":"沉痛哀悼著名茶文化专家陈文华教授逝世",
                        "url":"http://haixi.cnfol.com/chaye/20140521/17921785.shtml"
                    },
                    {
                        "title":"茶道茶具专家浅析:如何使用十四种常见茶具?",
                        "url":"http://www.sdchaju.com/ask_630.html"
                    }                    
                ]
            },
            {
                
                "articals":[
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
        ],
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
        ]
    }
});
}

