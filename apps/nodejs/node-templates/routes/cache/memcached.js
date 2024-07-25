const express = require('express');
var router = express.Router();
require('dotenv').config();

const memcached = require("../../cache/memcached/memcachedConnector");

const SVGs = require('../../SVGs')


router.get('/memcached',  (req, res) => {
  res.render('cach/memcached', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Memcached',
    svgs: SVGs,
  });
  res.locals.message = `Memcached Main Page Loaded!`;
});

router.get('/memcached/memcached_localhost',  (req, res) => {
  res.render('cach/memcached_template', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Memcached Localhost',
    svgs: SVGs,
  });
  res.locals.message = `Memcached Localhost Main Page Loaded!`;
});

module.exports = router;