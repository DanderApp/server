var knex = require('knex');
var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});



module.exports = {
  create: create(),
  read: read(),
  update: update(),
  deleteFunc: deleteFunc()
}
