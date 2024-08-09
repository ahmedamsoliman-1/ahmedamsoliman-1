const express = require('express');
const router = express.Router();
var middleware = require("../../middlewares/mongodb");
const SVGs = require('../../SVGs')


const authController = require('../../controllers/authController');


router.get('/mongo',  (req, res) => {
  res.render('db/mongo/mongo', {
    user: req.user, 
    time: new Date(),
    svgs: SVGs,
    pageTitle: 'Mongo DB'
  });
  res.locals.message = `Mongo DB Main Page Loaded!`;
});

router.get('/mongo/ahmed',  (req, res) => {
  res.render('db/mongo/mongo_ahmed', {
    user: req.user, 
    time: new Date(),
    svgs: SVGs,
    pageTitle: 'Mongo Ahmed'
  });
  res.locals.message = `Mongo DB Main Page Loaded!`;
});

router.get('/mongo/localhost1',  (req, res) => {
  res.render('db/mongo/mongo_lhost1', {
    user: req.user, 
    time: new Date(),
    svgs: SVGs,
    pageTitle: 'Mongo 1 Localhost'
  });
  res.locals.message = `Mongo DB Main Page Loaded!`;
});

router.get('/mongo/list-dbs-ahmed', middleware.listMongoDBDatabasesAhmed, (req, res) => {
  res.status(200).send(req.databasesList)
  res.locals.message = `Total of ${req.databasesList.databases.length} Retrived`;
});

router.get('/mongo/list-dbs-lhost1', middleware.listMongoDBDatabasesLHost1, (req, res) => {
  res.status(200).send(req.databasesList)
  res.locals.message = `Total of ${req.databasesList.databases.length} Retrived`;
});




module.exports = router;
