const express = require('express');
var router = express.Router();
var middleware = require("../../middlewares/Cassandra");
require('dotenv').config();

const SVGs = require('../../SVGs')
const config = require('../../config');


const authController = require('../../controllers/authController');


router.get('/cassandra', (req, res) => {
  res.render('db/cassandra/cassandra', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Cassandra',
    host_path: config.HOST_PATH,
    svgs: SVGs,
  });
  res.locals.message = `Cassandra Main Page Loaded!`;
});

router.get('/cassandra/cassandra_alpha', (req, res) => {
  res.render('db/cassandra/cassandra_template', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Cassandra Alpha',
    host_path: config.HOST_PATH,
    svgs: SVGs,
    which_cassandra: 'alpha',
  });
  res.locals.message = `Cassandra Alpha Page Loaded!`;
});

router.get('/cassandra/cassandra_beta', (req, res) => {
  res.render('db/cassandra/cassandra_template', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Cassandra Beta',
    host_path: config.HOST_PATH,
    svgs: SVGs,
    which_cassandra: 'beta',
  });
  res.locals.message = `Cassandra Beta Page Loaded!`;
});

router.get('/cassandra/cassandra_localhost', (req, res) => {
  res.render('db/cassandra/cassandra_template', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'Cassandra Localhost',
    host_path: config.HOST_PATH,
    svgs: SVGs,
    which_cassandra: 'localhost',
  });
  res.locals.message = `Cassandra Localhost Page Loaded!`;
});




router.get('/cassandra_keyspace_and_tables', middleware.getKeyspacesAndTables, async (req, res) => {
  try {
    res.locals.message = ``;
    res.status(200).json(req.nonSystemKeyspacesWithTables);
  } catch (error) {
    console.error("Error while querying Cassandra:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


router.get('/cassandra_tables_for_keyspace', middleware.getTablesinKeyspace, async (req, res) => {
  try {
    res.locals.message = ``;
    res.status(200).json(req.result);
  } catch (error) {
    console.error("Error while querying Cassandra:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get('/cassandra_tables', middleware.getCassandraTablesContent, async (req, res) => {
  try {
    res.locals.message = ``;
    res.status(200).json(req.result);
  } catch (error) {
    console.error("Error while querying Cassandra:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


module.exports = router;