// const redis = require('redis');
const client = require('../db/redisConnector');




const cachingMiddleware = {}




cachingMiddleware.cachingMiddleware_s3 = async (req, res, next) => {
  try {
    const { key, fetchDataFromDB, dataKey, expirations } = req.cacheConfig;

    const cachedData = await client.get(key);

    if (cachedData) {
      console.log(`Data found in Redis cache for ${key}, return it`);
      const parsedData = JSON.parse(cachedData);
      res.status(200).json(parsedData);
    } else {
      console.log(`Data not found in cache fir ${key}, fetch from primary source`);
      fetchDataFromDB(req, res, async () => {
        const data = req[dataKey];
        const jsonData = JSON.stringify(data);

        console.log(`Store data in Redis for future use for ${key} with expirations for ${expirations}`);
        await client.setEx(key, expirations, jsonData);

        console.log(`Return the fetched data for ${key}`);
        res.status(200).json(data);
      });
    }
  } catch (error) {
    console.error('Error in fetching or caching data:', error);
    res.status(500).send('Internal Server Error');
  }
};



cachingMiddleware.cachingMiddleware_es = async (req, res, next) => {
  try {
    const { key, function_name, fetchDataFromDB, expirations } = req.cacheConfig;
    

    const cachedData = await client.get(key);

    if (cachedData) {
      console.log(`Data found in Redis cache for ${key}, return it`);
      const parsedData = JSON.parse(cachedData);
      res.status(200).json(parsedData);
    } else {
      console.log(`Data not found in cache for ${key}, fetch from primary source`);
      fetchDataFromDB(req, res, async () => {
        const data = req[function_name];
        const jsonData = JSON.stringify(data);

        console.log(`Store data in Redis for future use for ${key} with expirations for ${expirations}`);
        await client.setEx(key, expirations, jsonData);

        console.log(`Return the fetched data for ${key}`);
        res.status(200).json(data);
      });
    }
  } catch (error) {
    console.error('Error in fetching or caching data:', error);
    res.status(500).send('Internal Server Error');
  }
};

function redisGetAsync(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

function redisSetAsync(key, value, expiration) {
  return new Promise((resolve, reject) => {
    client.setEx(key, expiration, value, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('OK');
      }
    });
  });
}

module.exports = cachingMiddleware;
