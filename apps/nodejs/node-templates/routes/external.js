const express = require('express');
var router = express.Router();
var middleware = require("../middlewares/ES");
require('dotenv').config();

const authController = require('../controllers/authController');


router.get('/external', (req, res) => {
  res.render('external', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'External',
  });
  res.locals.message = `External Main Page Loaded!`;
});

module.exports = router;