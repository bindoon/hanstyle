var co = require('co');
var dbHelper = require('../models/dbHelper');
var mongoose = require('mongoose');
var jsonprc = require('../biz/jsonprc')
var BSON = require('bson').BSONPure;

//配置后台字段映射
mongoose.model('dbcfg', new mongoose.Schema({
    table: String,
    column:String,
    mapname: String,
    type: String,
    createTime:Date,
    modifyTime:Date
}));

function getKey(kv) {
    var keyMap = {};
    for(var name in kv) {
        keyMap[name]=kv[name];
    }
    return keyMap;
}
function getColumnKV(kv) {
    var key = [];
    for(var name in kv) {
        if (name == '__v' || name == '_id') {
            continue;
        };
        key.push({
            name: name,
            type:kv[name].instance
        })
    }
    return key;
}

var tableMap = getKey(mongoose.modelSchemas);


function* queryData(usermodel,condition) {
    return  yield dbHelper.query(usermodel, condition);
}

function* insertData(usermodel,list) {
    for (var i = 0; i < list.length; i++) {
        yield dbHelper.insert(usermodel, list[i]);
    };
    return  0;
}

function* updateData(usermodel,list) {
    for (var i = 0; i < list.length; i++) {
        var obj_id = BSON.ObjectID.createFromHexString(list[i]._id);
        yield dbHelper.findOneAndUpdate(usermodel,{_id:obj_id}, list[i], {});
    };
    return  0;
}

function* removeData(usermodel,list) {
    for (var i = 0; i < list.length; i++) {
        var obj_id = BSON.ObjectID.createFromHexString(list[i]._id);
        yield dbHelper.remove(usermodel,{_id:obj_id});
    };
    return  0;
}

exports.dbcfg = function(req, res, next) {
    var param = req.getParamObject();

    if (!param.table||!param.op) {
        res.send(jsonprc.error(-10,'param error'));
        return;
    };

    if (!(param.table in tableMap)) {
        res.send(jsonprc.error(-101,'table not found'));
        return;
    };


    var usermodel = mongoose.model(param.table);
    var columns = getColumnKV(usermodel.schema.paths);

    var respone = {};


    co(function* (){
        switch(param.op) {
            case 'query':
            {
                var condition = param.condition? JSON.parse(param.condition):{};
                respone.result = {
                    columns: columns,
                    condition: condition
                }

                var data =  yield queryData(usermodel,condition);
                if (data.length >= 0) {
                    respone.result.list = data;
                    return respone;
                } else {
                    return jsonprc.error(-102,'query error');
                }
                break;
            }
            case 'insert':
            {
                var list = param.list? JSON.parse(param.list):[];
                yield insertData(usermodel,list);
                respone.result = {
                    code: 0,
                    msg: '添加成功'
                }
                return respone;
                break;
            }
            case 'update':
            {
                var list = param.list? JSON.parse(param.list):[];
                yield updateData(usermodel,list);
                respone.result = {
                    code: 0,
                    msg: '更新成功'
                }
                return respone;
                break;
            }
            case 'delete':
            {
                var list = param.list? JSON.parse(param.list):[];
                yield removeData(usermodel,list);
                respone.result = {
                    code: 0,
                    msg: '删除成功'
                }
                return respone;
                break;
            }
        }
    }).then(function(ret){

        if (param.callback) {
            res.send(param.callback+'('+JSON.stringify(ret)+')');
            return;
        };
        res.send(ret);
    })
}
