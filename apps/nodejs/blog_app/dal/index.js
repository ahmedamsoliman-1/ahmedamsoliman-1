let dal;

if (process.env.DB_TYPE === 'mongo') {
  dal = require('./mongo');
} else if (process.env.DB_TYPE === 'postgres') {
  dal = require('./postgres');
} else {
  throw new Error("No database selected or invalid database type");
}

module.exports = dal;
