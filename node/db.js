const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
    connectionString: 'the database URL',
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = db;
