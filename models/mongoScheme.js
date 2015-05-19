var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var user = new Schema({
    id:String,
    createTime:Date,
    modifyTime:Date,
    data:String, //创建时间(用data的schema拿到的数据效果不好，所以手动转化
    author:{
        id:String, //工号
        nickName:String,//花名
        realName:String,//真名
        pic:String//头像地址
    }, //问题的发布者
});
mongoose.model('user', user);
