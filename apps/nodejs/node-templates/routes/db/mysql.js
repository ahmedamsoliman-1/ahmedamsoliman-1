const express = require('express');
const router = express.Router();
var middleware = require("../../middlewares/db/mysql");



router.get('/mysql', (req, res) => {
  res.render('db/mysql', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'MySQL DB'
  });
  res.locals.message = `MySQL DB Main Page Loaded!`;
});



module.exports = router;
