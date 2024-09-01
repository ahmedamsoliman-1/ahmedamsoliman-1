const express = require('express');
var router = express.Router();
var middleware = require("../../middlewares/Cassandra");
require('dotenv').config();

const SVGs = require('../../SVGs')
const config = require('../../config');

const authController = require('../../controllers/authController');


router.get('/dbs', (req, res) => {
  res.render('db/dbs', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'DBs',
    host_path: config.HOST_PATH,
    svgs: SVGs,
  });
  res.locals.message = `Databases Main Page Loaded!`;
});



module.exports = router;