const { Client } = require('pg');

const middleare = require('../middlewares/utils');

const config = require('../config');

const pgClient = new Client({
  user: config.POSTGRESQL.POSTGRESQL_SQL_USER,
  host: config.POSTGRESQL.POSTGRESQL_SQL_HOST,
  database: config.POSTGRESQL.POSTGRESQL_SQL_DB,
  password: config.POSTGRESQL.POSTGRESQL_SQL_PASSWORD,
  port: 5432,
});

(async () => {
  try {
    await pgClient.connect();
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const connected = `- ${middleare.colorMiddleware.cyan}Connected To ${middleare.colorMiddleware.yellow}'PostgreSQL'`;
    const succ = `${middleare.colorMiddleware.cyan}Successfully${middleare.colorMiddleware.reset}`;
    const loc = `at ${middleare.colorMiddleware.green}${pgClient.host}:${pgClient.port}/${pgClient.database}${middleare.colorMiddleware.reset}`;
    console.log(time, connected, succ, loc);
  } catch (error) {
    // console.error('Error connecting to PostgreSQL:', error);
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const nconnected = `- ${middleare.colorMiddleware.red}Not Connected To ${middleare.colorMiddleware.yellow}'PostgreSQL'`;
    const loc = `at ${middleare.colorMiddleware.green}${pgClient.host}:${pgClient.port}/${pgClient.database}${middleare.colorMiddleware.reset}`;
    console.log(time, nconnected, loc);
  }
})();

module.exports = pgClient;
