const express = require('express');
var router = express.Router();
require('dotenv').config();

const memcached = require("../../cache/memcached/memcachedConnector");

const SVGs = require('../../SVGs')
const config = require('../../config');

router.get('/cache/memcached',  (req, res) => {
  res.render('cach/memcached', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Memcached',
    host_path: config.HOST_PATH,
    svgs: SVGs,
  });
  res.locals.message = `Memcached Main Page Loaded!`;
});

router.get('/cache/memcached/memcached_localhost',  (req, res) => {
  res.render('cach/memcached_template', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Memcached Localhost',
    host_path: config.HOST_PATH,
    svgs: SVGs,
  });
  res.locals.message = `Memcached Localhost Main Page Loaded!`;
});

module.exports = router;