const express = require('express');
var router = express.Router();
require('dotenv').config();

const redis = require("../../cache/redis/redisConnector");

const authController = require('../../controllers/authController');
const SVGs = require('../../SVGs')


router.get('/redis/add/key',  async (req, res) => {
  try {
    res.locals.message = ``;
    await redis.setEx(redis_key, EXP, redis_content);
    res.status(200).send("Value set in Redis");
  } catch (error) {
    console.error("Error setting value in Redis:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.get('/redis/get/all',  async (req, res) => {
  try {
    res.locals.message = ``;
    const keys = await redis.keys('*');
    res.status(200).send(keys);
  } catch (error) {
    console.error("Error getting keys from Redis:", error);
    res.status(500).send("Internal Server Error");
  }
});






router.get('/redis/get/:key',  async (req, res) => {
  const { key } = req.params;
  try {
    res.locals.message = ``;
    const value = await redis.get(key);
    res.send(value);
  } catch (error) {
    console.error(`Error getting value for key ${key} from Redis:`, error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete('/redis/delete/:key',  async (req, res) => {
  const { key } = req.params;
  try {
    res.locals.message = ``;
    await redis.del(key);
    res.status(204).end(); // Successful deletion, no content to send
  } catch (error) {
    console.error(`Error deleting key ${key} from Redis:`, error);
    res.status(500).send("Internal Server Error");
  }
});





router.get('/redis',  (req, res) => {
  res.render('cach/redis', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Redis',
    svgs: SVGs,
  });
  res.locals.message = `Redis Main Page Loaded!`;
});

router.get('/redis/redis_remote_1', async (req, res) => {
  const redis_info = await redis.info();  
  res.render('cach/redis_template', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Redis',
    svgs: SVGs,
    info: redis_info,
  });
  res.locals.message = `Redis Main Page Loaded!`;
});

module.exports = router;