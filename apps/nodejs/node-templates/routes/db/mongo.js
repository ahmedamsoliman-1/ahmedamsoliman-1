const express = require('express');
const router = express.Router();
var middleware = require("../../middlewares/mongodb");


const authController = require('../../controllers/authController');


router.get('/mongo',  (req, res) => {
  res.render('db/mongo', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Mongo DB'
  });
  res.locals.message = `Mongo DB Main Page Loaded!`;
});

router.get('/mongo/list-dbs',  middleware.listMongoDBDatabases, (req, res) => {
  res.status(200).send(req.databasesList)
  res.locals.message = `Total of ${req.databasesList.databases.length} Retrived`;
});




module.exports = router;
