const express = require('express');
var router = express.Router();

const SVGs = require('../SVGs')
const config = require('../config');

router.get('/', (req, res) => {
  res.locals.message = `Server Started!`;
  res.render('index', {
    user: req.user, 
    time: new Date(),
    pageTitle: '',
    host_path: config.HOST_PATH,
    svgs: SVGs,
  });
});

module.exports = router;
