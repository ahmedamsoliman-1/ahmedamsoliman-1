const express = require('express');
const router = express.Router();
var middleware = require("../../middlewares/db/mysql");

const config = require('../../config');

router.get('/mysql', (req, res) => {
  res.render('db/mysql', {
    user: req.user, 
    time: new Date(),
    host_path: config.HOST_PATH,
    pageTitle: 'MySQL DB'
  });
  res.locals.message = `MySQL DB Main Page Loaded!`;
});



module.exports = router;
