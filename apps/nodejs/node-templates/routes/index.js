const express = require('express');
var router = express.Router();

const SVGs = require('../SVGs')



router.get('/', (req, res) => {
  res.locals.message = `Server Started!`;
  res.render('index', {
    user: req.user, 
    time: new Date(),
    pageTitle: '',
    svgs: SVGs,
  });
});

module.exports = router;
