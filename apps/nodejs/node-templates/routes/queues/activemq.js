const express = require('express');
var router = express.Router();

const ActiveMQConnector = require('../../queues/ActiveMQ');
const activemq = new ActiveMQConnector();
activemq.connect();

const authController = require('../../controllers/authController');

router.get('/activemq', async (req, res) => {
    const info = await activemq.getActiveMQInfo();
    res.render('queues/activemq', {
        user: req.user, 
        time: new Date(),
        pageTitle: 'Activemq',
        rabbitInfo: info,
    });
    res.locals.message = `RabbitMQ Main Page Loaded!`;
});





module.exports = router;