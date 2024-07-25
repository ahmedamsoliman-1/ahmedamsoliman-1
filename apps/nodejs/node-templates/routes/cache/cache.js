const express = require('express');
var router = express.Router();
require('dotenv').config();

const SVGs = require('../../SVGs')


const redis = require('./redis');

router.get('/cache',  (req, res) => {
  res.render('cach/cache', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Cache',
    svgs: SVGs,
  });
  res.locals.message = `Cache Main Page Loaded!`;
});


module.exports = router;