'use strict';


var fs = require('fs'),
    formidable = require('formidable');
var co = require('co');



var config = {
    uploadDir: '/root/www/imagesupload/'
//    uploadDir: '/Users/eden/work/'
}

exports.imageupload = function(req,res,next) {
    if (req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = config.uploadDir;
        form.keepExtensions = true;
        form.maxFieldsSize = 10 * 1024 * 1024;


        form.parse(req, function(err, fields, files) {

            var filename = files.file.path;
            var contentType = files.file.type;

            res.send({
                result:{
                    "url" : 'http://www.bouda.cn/imagesupload/'+filename.replace(config.uploadDir,'')
                }                
            });
        });
        return;
    }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="file" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}

