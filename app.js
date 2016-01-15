var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var FB = require('fb');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').load();

// Route Exports
var routes = require('./routes/index');
var users = require('./routes/users');
var connections = require('./routes/connections');
var account = require('./routes/account');
var auth = require('./routes/auth')

// Module Exports
var request = require('./request')
var filter = require('./filter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Authorization');
  next();
});

//Public Routes

app.use('/auth', auth.router);
app.get('/dogs', function(req, res) {
  // var returnObject;
  getRequestAPICall()
  .then(function(data) {
    // returnObject = data;
    console.log('API Calling');
    console.log(data);
    res.json(data);
  }).catch(function(){
    res.json('Something broke, yo!')
  })
  .catch(function(err) {
    console.log(err);
  })

})

//Authenticated Routes
// app.use(auth.authenticate);
app.use('/', routes);
app.use('/users', users);
app.use('/connections', connections);
app.use('/account', account);

// API Call Functions

function getRequestAPICall(zipcode) {
  return new Promise(function(resolve,reject){
    request(zipcode)
    .then(function(data) {
      return filter.filter(data);
    })
    .then(function(data) {
      resolve(data);
    })
    .catch(function(err) {
      reject(err)
    })
  });
}

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
