const express = require('express');
var router = express.Router();


const middlewares = require('../../middlewares/GitHub');
const authController = require('../../controllers/authController');


router.get('/github', async  (req, res) => {
  const repos_info = await middlewares.getRepos2();
  res.render('git/github', {
    user: req.user, 
    time: new Date(),
    repos: repos_info,
    pageTitle: 'Github'
  });
  res.locals.message = `GitHub Main Page Loaded!`;
});



router.get('/github-get-repos', middlewares.getRepos, (req, res) => {
  res.locals.message = ``;
  res.status(200).send(req.repos_info)
});


module.exports = router;