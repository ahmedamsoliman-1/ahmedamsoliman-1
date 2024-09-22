let config = require('../config/config');
let dal;
const ll = require('../middleware/utils');

ll.llog("[DAL]")
ll.llog(`Current DAL Supported ${config.DB_TYPE}`)
if (config.DB_TYPE === 'mongo') {
  dal = require('./mongo');
} else if (config.DB_TYPE === 'postgres') {
  dal = require('./postgres');
} else {
  throw new Error("No database selected or invalid database type");
}

module.exports = dal;
