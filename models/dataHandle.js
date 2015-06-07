var co = require('co');
var dbHelper = require('../util/dbHelper');
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
        return yield dbHelper.query(mongoose.model('indexdata'));
    }).then(function(data){
        cb&&cb(data);
    })
}