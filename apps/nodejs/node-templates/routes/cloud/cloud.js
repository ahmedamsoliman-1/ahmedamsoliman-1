const express = require('express');
const router = express.Router();

const middlewares = require('../../middlewares/utils');
const SVGs = require('../../SVGs')
const config = require('../../config');


router.get('/aams/cloud',  async (req, res) => {
  try {
    res.locals.message = 'AWS Cloud Page Loaded';
    res.render('cloud/cloud', {
      time: new Date(),
      pageTitle: 'AAMS Cloud',
      user: req.user,
      svgs: SVGs,
    });
    
  } catch (error) {
    res.status(500).send('Error checking connection to AWS');
    middlewares.llog(`Not Connected to AWS '${error}'`, 'red', 'aws');
  }
});


module.exports = router