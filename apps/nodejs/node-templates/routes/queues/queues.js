const express = require('express');
var router = express.Router();
require('dotenv').config();

const SVGs = require('../../SVGs')
const config = require('../../config');

router.get('/queues',  (req, res) => {
  res.render('queues/queues', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Queues',
    host_path: config.HOST_PATH,
    svgs: SVGs,
  });
  res.locals.message = `Queues Main Page Loaded!`;
});


module.exports = router;