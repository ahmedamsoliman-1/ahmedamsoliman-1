const { createClient } = require('redis');
require('dotenv').config();
const middleare = require('../../middlewares/utils');
const config = require('../../config');

const host = config.REDIS.REDIS_HOST;
const port = config.REDIS.REDIS_PORT;
const password = config.REDIS.REDIS_PASSWORD;

const redisOptions = {
  host: host,
  port: port,
  password: password,
};

const redisUri = `redis://default:${password}@${host}:${port}`;
const redis = createClient({ url: redisUri });

(async () => {
  try {
    await redis.connect();
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`
    const connected = `- ${middleare.colorMiddleware.cyan}Connected To ${middleare.colorMiddleware.yellow}'Redis'`
    const succ = `${middleare.colorMiddleware.cyan}Successfully${middleare.colorMiddleware.reset}`
    const loc = `at ${colorMiddleware.green}${redisOptions.host} ${middleare.colorMiddleware.reset}`
    console.log(time, connected, succ, loc);
  } catch (error) {
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`
    const nconnected = `- ${middleare.colorMiddleware.red}Not Connected To ${middleare.colorMiddleware.yellow}'Redis'`
    const loc = `at ${colorMiddleware.green}${redisOptions.host} ${middleare.colorMiddleware.reset}`
    console.log(time, nconnected, loc);
  }
})();

module.exports = redis;
