var migration = require('../dander-db/migrations/20160111103304_simpleConnection.js');
var knex = require('knex');
var pg = require('pg');
var config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: true
}
require('dotenv').load();



//Connections Functions



knex(config);

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
