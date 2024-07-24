const express = require('express');
const router = express.Router();
const ll = require('../middleware/utils');

router.get('/', (req, res) => {
  res.render('index');
  ll.llog('Index page rendered');
});

module.exports = router;
