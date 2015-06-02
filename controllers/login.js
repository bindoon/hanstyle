var express = require('express');
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongodb');  

router.route('/login')
.get(function(req, res) {
    if (req.session&& req.session.error) {
        res.locals.message = req.session.error;
    }
    res.render('login', { title: '用户登录'});
}).post(function(req, res) {
    var user = {
        email: req.body.email,
        passWord : req.body.password
    }
    var otype = req.getParam('otype');
            console.log(otype);

    dataHandle.login(user,function(data){console.log(data);
        if (data.length) {
            req.session.user = user;
            if (otype=="json") {
                res.send({
                    result:{
                        code: 0,
                        message:'success'
                    }
                });
            } else {
                if (req.body.back_url) {
                    res.redirect(req.body.back_url);
                };
                res.redirect('/');
            }
        } else {
            if (otype=="json") {
                res.send({
                    error:{
                        code: -10002,
                        message:'用户名或密码不正确'
                    }
                });
            } else {
                req.session.error='用户名或密码不正确!';
                res.redirect(req.url);            
            }
        }
    });
});
router.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/');
});

var dataHandle = require('../models/dataHandle');
router.route('/register')
.get(function(req, res, next) {
    res.render('register',{'title': '用户注册'});
}).post(function(req,res){
    var param = req.body;
    var time = new Date();
    var data = {
        email: param.email,
        nickName: param.nickname,
        passWord: param.password,
        createTime : time,
        modifyTime : time
    }
    dataHandle.register(data,function(data){
        if (data == -1) {
            res.send({
                error: {
                    message: '用户已经存在'
                }
            })
        } else {
            res.send({
                result: {
                    message: 'success'
                }
            })  
        }
    })
})

function authentication(req, res) {
    if (!req.session.user) {
        req.session.error='请先登录';
        
        return res.redirect('/login'+ (req.url? '?back_url='+req.url:''));
    }
}

function login(app,Settings,db) {
    app.use(cookieParser());
    app.use(session({
        cookie: { maxAge: 600000 },
        secret: Settings.COOKIE_SECRET,
        store: new MongoStore({  
            resave: false,  
            saveUninitialized: true,  
            username: Settings.USERNAME,
            password: Settings.PASSWORD,
            url: Settings.URL,
            db: db})
    }));

    app.use(router);

    app.use(function(req, res, next){
        var otype = req.getParam('otype');

        if (!req.session.user) {
            console.log(otype,req.otype);
            if (otype=='json') {
                res.send({
                    error:{
                        code: -10001,
                        message: 'not login'
                    }
                });
                return;
            } else {
                req.session.error='请先登录';
                return res.redirect('/login'+ (req.url? '?back_url='+req.url:''));                
            }
        }

        res.locals.user = req.session.user;

        var err = req.session.error;
        delete req.session.error;
        res.locals.message = '';

        next();
    });
}

module.exports = login;
