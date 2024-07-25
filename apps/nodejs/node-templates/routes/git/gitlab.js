const express = require('express');
var router = express.Router();

const SVGs = require('../../SVGs')


// const middlewares = require('../../middlewares/Gitlab');
const authController = require('../../controllers/authController');


router.get('/gitlab',  (req, res) => {
  res.render('git/gitlab', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Gitlab',
    svgs: SVGs,
  });
  res.locals.message = `Gitlab Main Page Loaded!`;
});

router.get('/gitlab/ahmedamsoliman-1', (req, res) => {
  res.render('git/gitlab-temp', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Gitlab ahmedamsoliman-1'
  });
  res.locals.message = `Gitlab Main Page Loaded!`;
});

router.get('/gitlab/ahmed-soliman',  (req, res) => {
  res.render('git/gitlab-temp', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Gitlab ahmed.soliman'
  });
  res.locals.message = `Gitlab Main Page Loaded!`;
});


module.exports = router;