var knex = require('knex');
var connection = 'connection_string';



module.exports = {
  create: create(),
  read: read(),
  update: update(),
  deleteFunc: deleteFunc()
}
