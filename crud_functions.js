var knex = require('./db/knex');
var pg = require('pg');
var config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: true
}
require('dotenv').load();

var user = function() {
  return knex('user')
}

var connection = function() {
  return knex('connection')
}

//User Functions
function reqTest() {
  return user().select().then(function(user) {
    return user;
  })
}

function requestUsers() {
  return user().select().then(function(user) {
    return user;
  })
}

function requestUser(id) {
  return user().select().where('id', id).then(function(user) {
    return user;
  })
}

//Connection Data

// function connectionTest() {
//   return connection().select().then(function(connection) {
//     return connection;
//   })
// }

function checkConnection(id, petID) {
  return connection().where({
    user_id: id,
    petfinder_id: petID
  }).select().then(function(user) {
    return user;
  })
}

// reqTest().then(function(data) {
//   console.log(data);
// })

module.exports = {
  //CRUD Functions
  User: {
  // create: create(),
    readAllUsers: requestUsers(),
    readOneUser: requestUser()
  // update: update(),
  // deleteFunc: deleteFunc()
  },
  Connection: {
    checkConnection: checkConnection()
  }
}
