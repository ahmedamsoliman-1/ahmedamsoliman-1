
const dotenv = require('dotenv');
const ENVPATH = process.env.ENVPATH || '.env';
const middlewares = require('./middlewares');

const envFound = dotenv.config({ path: ENVPATH });
if (!envFound) {
  throw new Error('.env file not found');
} else {
  middlewares.llog('ENV File Loaded');
}


const env = process.env;


const configObj = {
  APP_NAME: 'NotFound',
  APP_PORT: env.APP_PORT,
  APP_PATH: env.APP_PATH || '/',
  APP_ENVIRONMENT: env.ENVIRONMENT,
  APP_VERSION: env.APP_VERSION || '0.0.1',
  DEV_NEW_RELIC_ACCESS_KEY: env.DEV_NEW_RELIC_ACCESS_KEY,
};

module.exports = configObj;
