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

//类别
mongoose.model('category', new Schema({
    id: Number,
    name:String,
    pic: String,
    createTime:Date,
    modifyTime:Date
}));

//类别详情
mongoose.model('categorydetail', new Schema({
    id: Number,
    cateId: Number,
    name:String,
    pic: String,
    createTime:Date,
    modifyTime:Date
}));

//类别详情
mongoose.model('indexdata', new Schema({
    type: Number,
    title: String,
    subtitle: String,
    desc: String,
    pic: String,
    createTime:Date,
    modifyTime:Date
}));

