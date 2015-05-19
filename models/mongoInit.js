var mongoose = require('mongoose');


var dbaddress = '127.0.0.1';
var dbName = 'hanStyle';

console.error('[mongodb] db address:%s',dbaddress);
var dbAdress = 'mongodb://'+dbaddress+'/'+dbName;

//mongoose.connect('mongodb://y87iut03d4:le44ldve04@mongo.labs.taobao.net:27017/n6wejl87xkquwnx7k9s0');
mongoose.connect(dbAdress);
var db = mongoose.connection;
db.on('error', function(err){
    logger.error('[mongodb] connect to %s error: ',  err.message);
    process.exit(1);
});
db.once('open', function () {
   logger.info('[mongodb] once open');
});

require('./mongoScheme');
