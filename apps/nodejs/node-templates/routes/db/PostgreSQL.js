const express = require('express');
const router = express.Router();
var middleware = require("../../middlewares/db/PostgreSQL");

const config = require('../../config');


router.get('/postgresql', async (req, res) => {
  const postgresql_databases = await middleware.listPostgreSQLDatabases();
  console.log(postgresql_databases)
  res.render('db/postgresql', {
    user: req.user, 
    time: new Date(),
    dbs: postgresql_databases,
    host_path: config.HOST_PATH,
    pageTitle: 'PostgreSQL DB'
  });
  res.locals.message = `PostgreSQL DB Main Page Loaded!`;
});

router.get('/postgresql/:db_name', async (req, res) => {
  const db_name = req.params.db_name;
  const postgresql_tables = await middleware.listPostgreSQLTables(db_name);
  res.render('db/postgresql_tables', {
    user: req.user,
    time: new Date(),
    db_name: db_name,
    tables: postgresql_tables,
    host_path: config.HOST_PATH,
    pageTitle: 'PostgreSQL DB'
  });
  res.locals.message = `PostgreSQL DB Main Page Loaded!`;
});

module.exports = router;
