const express = require('express');
var router = express.Router();

const SVGs = require('../../SVGs');
const config = require('../../config');



router.get('/document',  (req, res) => {
  res.render('document/document', { 
    user: req.user, 
    time: new Date(),
    pageTitle: 'Documents', 
    host_path: config.HOST_PATH,
    svgs: SVGs,
  });
  res.locals.message = `Document Main Page Loaded!`;
});


module.exports = router;