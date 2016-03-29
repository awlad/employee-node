var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//extra module
var http = require('http');
var connection  = require('express-myconnection');
var mysql = require('mysql');

var app = express();

app.set('port', process.env.PORT || 5000);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



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

app.use(

    connection(mysql,{

      host: 'localhost',
      user: 'root',
      password : 'root',
      port : 3306, //port mysql
      database:'nodejs'
    },'request')
);

//app.use('/', routes);
app.use('/users', users);

app.get('/', routes.index);
app.get('/employees', employees.list);//route add customer, get n post
app.get('/employees/add', employees.add);
app.post('/employees/add', employees.save);//route delete customer
app.get('/employees/delete/:id', employees.delete);//edit customer route , get n post
app.get('/employees/edit/:id', employees.edit);
app.post('/employees/edit/:id',employees.update);
app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//module.exports = app;


//var express = require('express');
//var routes = require('./routes');
//var http = require('http');
//var path = require('path');
////load customers route
//var employees = require('./routes/employees');
//var app = express();
//var connection  = require('express-myconnection');
//var mysql = require('mysql');
//
//// all environments
//app.set('port', process.env.PORT || 5000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(express.static(path.join(__dirname, 'public')));
//// development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}
/*------------------------------------------
 connection peer, register as middleware
 type koneksi : single,pool and request
 -------------------------------------------*/



