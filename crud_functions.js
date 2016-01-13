var knex = require('knex');
var pg = require('pg');
var config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: true
}
require('dotenv').load();

// var user = knex('user');

//Connections Functions

function requestUsers() {
  knex('user').select()
}

requestUsers()



module.exports = {
  //Connection
  knexConfig: knex(config),
  //CRUD Functions
  // create: create(),
  // read: read(),
  // update: update(),
  // deleteFunc: deleteFunc()
  //
}
