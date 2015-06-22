var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.model('user', new Schema({
    nickName:String,
    passWord:String,
    email: String,
    pic: String,
    level: Number,
    createTime:Date,
    modifyTime:Date
}));

//首页数据配置接口
mongoose.model('indexdata', new Schema({
    type: Number,   /* 用来区分首页区块*/
    title: String,
    subtitle: String,
    desc: String,
    pic: String,
    link: String,
    createTime:Date,
    modifyTime:Date
}));

//类别
mongoose.model('category', new Schema({
    id: Number,
    name:String,    /* 茶道、花道、*/
    pic: String,
    createTime:Date,
    modifyTime:Date
}));

//名家
mongoose.model('categoryfamous', new Schema({
    id: Number,
    cateId: Number, /* 分类 关联 category的id*/
    name:String,
    desc: String,
    pic: String,
    createTime:Date,
    modifyTime:Date
}));

//名家
mongoose.model('famousDetail', new Schema({
    id: Number,
    cateId: Number, /* 分类 关联 category的id*/
    name:String,
    desc: String,
    pic: String,
    createTime:Date,
    modifyTime:Date
}));