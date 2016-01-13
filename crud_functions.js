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
  user().select().then(function(user) {
    console.log(user);
  })
}

function requestUsers() {
  return new Promise(function(reject, resolve) {
    user().select().then(function(user) {
      resolve(user);
    })
  })
}

function requestUser(id) {
  return new Promise(function(reject, resolve) {
    user().select().where('id', id).then(function(user) {
      resolve(user);
    })
  });
}

//Connection Data

function connectionTest() {
  connection().select().then(function(connection) {
    console.log(connection);
  })
}

function checkConnection(id, petID) {
  return new Promise(function(reject, resolve) {
    connection().where({
      user_id: id,
      petfinder_id: petID
    }).select().then(function(user) {
      resolve(user)
    })
  })
}

reqTest();
connectionTest();


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
