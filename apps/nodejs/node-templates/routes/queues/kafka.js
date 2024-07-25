const express = require('express');
const router = express.Router();

const KafkaClient = require('../../queues/KafkaConnector');
const kafka = new KafkaClient();
kafka.connect();

router.get('/kafka', async (req, res) => {
  const info = await kafka.getKafkaInfo();
  res.render('queues/kafka', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Kafka',
    kafkaInfo: info,
  });
  res.locals.message = `Kafka Main Page Loaded!`;
});






module.exports = router;
