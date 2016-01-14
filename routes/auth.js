var knex = require('../db/knex');
var passport = require('passport');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = function() {
  return knex('user');
}

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
  session: false
}, function(req, email, password, done) {
  User().where({
    'email': email
  }).first().then(function(user) {
    if (user && bcrypt.compareSync(password, user.password)) {
      done(null, user)
    } else {
      done('Invalid Email or Password')
    }
  })
  .catch(function(err) {
    done(err)
  })
}));

passport.use(new BearerStrategy(function(token, done) {
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
    if (err) return done(err);
    done(null, decoded.user);
  });
}));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: process.env.HOST + '/auth/facebook/callback',
//     enableProof: false
//   },
//   function(accessToken, refreshToken, profile, done) {
//     process.nextTick(function () {
//
//       // To keep the example simple, the user's Facebook profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the Facebook account with a user record in your database,
//       // and return that user instead.
//       console.log('Name: ', accessToken, '\n');
//       return done(null, profile);
//     });
//   }
// ));

//Functions

function createToken(user, accessToken) {
  return new Promise(function(resolve, reject){
    delete user.password;
    var data = {
      user: user
    }

    if(accessToken) data.accessToken = accessToken;

    jwt.sign(data, process.env.TOKEN_SECRET, {
      expiresIn: '1d'
    }, function(token) {
        resolve(token);
    })
  })
}

//Routes

router.post('/login',
function(req,res,next) {
  passport.authenticate('local',
  function(err, user, info) {
    // if (err) return next(err);
    if(user) {
      createToken(user).then(function(token) {
        res.json({
          token: token
        })
      })
    } else {
      res.status(401).send('Invalid Login');
      // next('Invalid Login');
    }
  })(req, res, next);
});

// router.post('/signup',
// funtion(req,res,next) {
//   passport.authenticate('local',
//   function(err, user, info) {
//     if (err) return next(err);
//     if
//   })
// })

// router.get('/facebook',
//   passport.authenticate('facebook', {authType: 'reauthenticate'}),
//   function(req,res) {
//     res.send('Request Working')
// });
//
// router.get('/facebook/callback',
//   passport.authenticate('facebook', { authType: 'reauthenticate', failureRedirect: '/' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
//
// router.get('/logout', function(req,res) {
//   req.logout();
//   res.redirect('/');
// })

module.exports = {
  router: router,
  authenticate: function(req, res, next) {
    passport.authenticate('bearer', function(err, user, info) {
      req.user = user;
      next()
    })(req, res, next)
  }
}
