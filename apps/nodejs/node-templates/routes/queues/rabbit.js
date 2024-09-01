const express = require('express');
var router = express.Router();

const config = require('../../config');


const RabbitConnector = require('../../queues/Rabbit');
const rabbit = new RabbitConnector();
rabbit.connect();

const queueName = 'aams_my_queue';
const exchangeName = 'aams_my_exchange';
const routingKey = 'aams_routing_key';
const message = 'Hello, World!';

const authController = require('../../controllers/authController');


router.get('/rabbit', async (req, res) => {
  const info = await rabbit.getRabbitInfo();
  res.render('queues/rabbit', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'RabbitMQ',
    host_path: config.HOST_PATH,
    rabbitInfo: info,
  });
  res.locals.message = `RabbitMQ Main Page Loaded!`;
});





module.exports = router;