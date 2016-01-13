var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var request = require('request');
var cors = require('cors');
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
// Module Exports

var request = require('./request')
var filter = require('./filter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session( {secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

//Passport

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.HOST + '/auth/facebook/callback',
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      console.log('Name: ', accessToken, '\n');
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, {firstname: 'Test', lastName: 'App'})
});

// app.use(function(req,res,next) {
//   app.locals.user = req.user;
//   next();
// })

// Routes

app.use('/', routes);
app.use('/users', users);
app.use('/connections', connections);
app.use('/account', account);


FB.api('oauth/access_token', {
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }

    var accessToken = res.access_token;
    console.log('Access Token = ', accessToken, '\n');
});

// FB.setAccessToken('access_token');
// var accessToken = FB.getAccessToken();
// console.log(accessToken);

app.get('/auth/facebook',
  passport.authenticate('facebook', {authType: 'reauthenticate'}),
  function(req,res) {
    res.send('Request Working')
});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { authType: 'reauthenticate', failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
})

app.get('/apitest', function(req, res) {
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



// Misc Functions

function getRequestAPICall() {
  return new Promise(function(resolve,reject){
    request()
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

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/login')
// }

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
