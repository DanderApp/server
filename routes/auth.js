var knex = require('../db/knex');
var passport = require('passport');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

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
    }
    else {
      console.log('error check');
      done(null, user)
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

// function authenticateUser(req, res, next) {
//   passport.authenticate('bearer', function(err, user, info) {
//     console.log(user);
//     if(err || !user) {
//       if (err) {
//         next(err);
//       } else {
//         res.status(401).send('Not logged in')
//       }
//     } else {
//       req.user = user;
//       next()
//     }
//   })(req, res, next)
// }

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
  console.log('authenticating');
  passport.authenticate('local',
  function(err, user, info) {
    if(user) {
      console.log('user found');
      console.log("Check");
      createToken(user).then(function(token) {
        res.json({
          token: token
        })
      })
    }
    else {
      console.log('invalid login');
      res.status(401).send('Invalid Login');
    }
  })(req, res, next);
});

router.post('/signup',
function(req,res,next) {
  console.log(req.body);
  User().where({
    'email': req.body.email
  }).first().then(function(user){
    if (user) {
      res.status(401).send('Email is already registered.')
    } else {
      var hash;
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, encrypted) {
          User().insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            zipcode: req.body.zipcode,
            password: encrypted
          }).then(function() {
            res.status(200).send('User added successfully')
          })
        })
      })
    }
  })
})

module.exports = {
  router: router,

  authenticate: authenticateUser
}
