var co = require('co');
var dbHelper = require('../models/dbHelper');
var mongoose = require('mongoose');

exports.getUserInfo = function (email,cb) {
    co(function* (){
        return yield dbHelper.query(mongoose.model('user'),{email:email});
    }).then(function(data){
        cb&&cb(data);
    })
}
exports.login = function (userinfo,cb) {
    co(function* (){
        return yield dbHelper.query(mongoose.model('user'),userinfo);
    }).then(function(data){
        cb&&cb(data);
    })
}

exports.register = function (userinfo, cb) {
    co(function* (){
        var usermodel = mongoose.model('user');

        var data =  yield dbHelper.query(usermodel, {email:userinfo.email});
        if (data.length > 0) {
            return -1;
        } else 
        yield dbHelper.insert(usermodel,userinfo);
        return 0 ;
    }).then(function(ret){
        cb&&cb(ret);
    })
}

exports.check = function (email,cb) {
    co(function* (){
        return yield dbHelper.query(mongoose.model('user'),{email:email});
    }).then(function(data){
        cb&&cb(data);
    })
}

exports.getIndex = function (cb) {
    co(function* (){
        var focus =  yield dbHelper.query(mongoose.model('indexdata'),{type:1});
        var second =  yield dbHelper.query(mongoose.model('indexdata'),{type:2});
        var third =  yield dbHelper.query(mongoose.model('indexdata'),{type:3});
        return {
            banner:{
                list:focus,
                name:'首页banner',
            },
            entrance:{
                list:second,
                name:'首页入口',
            },
            expert:{
                list:third,
                name:'推荐专家',
            }
        };
    }).then(function(data){
        cb&&cb(data);
    })
}

exports.getCategory = function* (id) {
    return yield dbHelper.query(mongoose.model('category'),{id:id});
}
