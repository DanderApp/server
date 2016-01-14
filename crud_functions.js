var knex = require('./db/knex');
var pg = require('pg');
var config = {
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost/dander',
  ssl: true
}
require('dotenv').load();

var user = function() {
  return knex('user')
}

var connection = function() {
  return knex('connection')
}

// Test Functions
function connectionTest() {
  return connection().select().then(function(connection) {
    return connection;
  })
}

function reqTest() {
  return user().select().then(function(user) {
    return user;
  })
}

// User Functions

function createUser(email, zipcode, password) {
  return user().insert({
    email       :  email,
    zipcode     :  zipcode,
    password    :  password,
    first_name  :  first_name,
    last_name   :  last_name
  }, 'id')
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

function updateUser(id, email){
  //add some if /else logic to handle multiple types of updates?
  return user().where('id', id).update({
    email: email
  })
}

function deleteUser(id){
  return user().where('id', id).del();
}

//Connection Data

function createConnection(userID, petID, liked){
    return connection().insert({
      user_id:        userID,
      petfinder_id:   petID,
      liked:          liked
    }, "id")
}

function checkConnection(userID, petID) {
  return connection().where({
    user_id: userID,
    petfinder_id: petID
  }).select().then(function(user) {
    return user;
  })
}

function petConnection(petID) {
  return connection().where({
    petfinder_id: petID
  }).select().then(function(pet) {
    return pet;
  })
}

function userConnection(userID) {
  return connection().where({
    user_id: userID
  }).select().then(function(user) {
    return user;
  })
}

function updateConnection(userID, petID, liked){
  return connection().where({
    user_id       : userID,
    petfinder_id  : petID
  }).update({
    liked: liked
  })
}

// Testing Zone
// reqTest().then(function(data) {
//   console.log(data);
// })
//
// connectionTest().then(function(data) {
//   console.log(data);
// })

module.exports      = {
  //CRUD Functions
  User              : {
    readAllUsers    : requestUsers,
    readOneUser     : requestUser,
    updateUser      : updateUser,
    deleteUser      : deleteUser,
  },
  Connection        : {
    checkConnection : checkConnection,
    petConnection   : petConnection,
    userConnection  : userConnection,
    createConnection: createConnection,
    updateConnection: updateConnection
  }
}
