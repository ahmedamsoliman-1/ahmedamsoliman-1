const express = require('express');
var router = express.Router();
var middleware = require("../../middlewares/ES");
require('dotenv').config();

const SVGs = require('../../SVGs')
const config = require('../../config');

const authController = require('../../controllers/authController');

router.get('/es/games', middleware.paginatedResults, (req, res) => {
  res.json(res.paginatedResults);
});

router.get('/es', (req, res) => {
  res.render('db/es/es', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Elastic Search',
    host_path: config.HOST_PATH,
    svgs: SVGs,
  });
  res.locals.message = `Elastic Search Main Page Loaded!`;
});

const provideAliasDataMiddleware = middleware.provideAliasData;

const middlewaresCollection = [provideAliasDataMiddleware];


router.get('/es/dev', middlewaresCollection, async (req, res) => {
  res.render('db/es/es-temp', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'ES Dev',
    host_path: config.HOST_PATH,
    cluster: req.aliasData['clusterName'],
    version: req.aliasData['version'],
    aliasGroups: req.aliasData['aliasGroups'], // Pass aliasGroups
    CS2RunOrg: req.aliasData['CS2RunOrg'],
    aliasedIndices: req.aliasData['aliasedIndices'],
  });
  res.locals.message = `Elastic Search Main Page Loaded!`;
});

router.get('/es/local', middleware.provideAliasData, (req, res) => {
  res.render('db/es/es-temp', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'ES Local',
    host_path: config.HOST_PATH,
    cluster: req.aliasData['clusterName'],
    version: req.aliasData['version'],
    aliasGroups: req.aliasData['aliasGroups'], // Pass aliasGroups
    CS2RunOrg: req.aliasData['CS2RunOrg'],
    aliasedIndices: req.aliasData['aliasedIndices'],
  });
  res.locals.message = `Elastic Search Main Page Loaded!`;
});



module.exports = router;