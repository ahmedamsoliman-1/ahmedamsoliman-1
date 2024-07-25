const mysql = require('mysql');
const middleware = require('../middlewares/utils');
const config = require('../config');

const connection = mysql.createConnection({
  host: config.MYSQL.MYSQL_HOST,
  user: config.MYSQL.MYSQL_USER,
  password: config.MYSQL.MYSQL_PASSWORD,
  database: config.MYSQL.MYSQL_DB,
  port: config.MYSQL.MYSQL_PORT
});

(async () => {
  try {
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          const time = `${middleware.colorMiddleware.magenta}${middleware.nowMiddleware}${middleware.colorMiddleware.reset}`;
          const nconnected = `- ${middleware.colorMiddleware.red}Not Connected To ${middleware.colorMiddleware.yellow}'MySQL'`;
          const loc = `at ${middleware.colorMiddleware.green}${config.MYSQL.MYSQL_HOST}:${config.MYSQL.MYSQL_PORT}/${config.MYSQL.MYSQL_DB}${middleware.colorMiddleware.reset}`;
          console.log(time, nconnected, loc);
          return;
        }
        resolve();
      });
    });

    const time = `${middleware.colorMiddleware.magenta}${middleware.nowMiddleware}${middleware.colorMiddleware.reset}`;
    const connected = `- ${middleware.colorMiddleware.cyan}Connected To ${middleware.colorMiddleware.yellow}'MySQL'`;
    const succ = `${middleware.colorMiddleware.cyan}Successfully${middleware.colorMiddleware.reset}`;
    const loc = `at ${middleware.colorMiddleware.green}${config.MYSQL.MYSQL_HOST}:${config.MYSQL.MYSQL_PORT}/${config.MYSQL.MYSQL_DB}${middleware.colorMiddleware.reset}`;
    console.log(time, connected, succ, loc);
  } catch (error) {
    const time = `${middleware.colorMiddleware.magenta}${middleware.nowMiddleware}${middleware.colorMiddleware.reset}`;
    const nconnected = `- ${middleware.colorMiddleware.red}Not Connected To ${middleware.colorMiddleware.yellow}'MySQL'`;
    const loc = `at ${middleware.colorMiddleware.green}${config.MYSQL.MYSQL_HOST}:${config.MYSQL.MYSQL_PORT}/${config.MYSQL.MYSQL_DB}${middleware.colorMiddleware.reset}`;
    console.log(time, nconnected, loc);
  }
})();

module.exports = connection;
