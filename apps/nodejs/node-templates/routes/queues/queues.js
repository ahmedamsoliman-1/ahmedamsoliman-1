const express = require('express');
var router = express.Router();
require('dotenv').config();

const SVGs = require('../../SVGs')


router.get('/queues',  (req, res) => {
  res.render('queues/queues', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Queues',
    svgs: SVGs,
  });
  res.locals.message = `Queues Main Page Loaded!`;
});


module.exports = router;