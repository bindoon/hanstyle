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

mongoose.model('category', new Schema({
    name:String,//花名
    pic: String,
    createTime:Date,
    modifyTime:Date
}));
