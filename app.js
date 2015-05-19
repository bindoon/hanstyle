var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'xtpl');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function addRouterFromFolder() {

    var folderPath =  path.join(__dirname, 'routes/');                  

    if (fs.existsSync(folderPath)) {
        try {
            fs.readdirSync(folderPath).forEach(function(fileName) {
                var filePath = path.join(folderPath, fileName),
                    fileStat = fs.statSync(filePath);

                if (fileStat.isDirectory()) {
                    addRouterFromFolder(filePath);
                } else if (fileStat.isFile()) {
                    var requireRouter = require(filePath);
                    app.use(requireRouter);
                }
            });
        } catch (ex) {
            console.log(
                '[router] failed to add router directory: %s, %s', folderPath, ex);
        }
    }
}
addRouterFromFolder();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
