const config = require('../config');
const mangeRedisService = require('../services/mangeRedisService');

var mangeRedisMiddlewares = {};

mangeRedisMiddlewares.listRedisKeys = async function (req, res) {
  try {
    const all_redis_keys = await mangeRedisService.listRedisKeys();
    res.locals.message = 'List Redis Keys Success';
    res.status(201).json({
      message: res.locals.message,
      total_of_all_redis_keys: all_redis_keys.length,
      all_redis_keys: all_redis_keys,
      redis_server: config.REDIS.REDIS_HOST
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'List Redis Keys Faild' });
  }
};

mangeRedisMiddlewares.listRedisInfo = async function () {
  try {
    const redis_info = await mangeRedisService.listRedisInfo();
    return redis_info;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'List Redis Info Faild' });
  }
};

module.exports = mangeRedisMiddlewares;
