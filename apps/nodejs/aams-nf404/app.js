// require('newrelic');
const express = require("express");
const app = express();
const config = require("./utils/config");
const utils = require('./utils/utils');
const middlewares = require("./utils/middlewares");

const { setupMetrics } = require('./metrics');


setupMetrics(app); 


const cors = require('cors');
app.use(middlewares.addTimestamp);
app.use(middlewares.logger);
app.use(cors());

app.set("view engine", "ejs");


app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.render('index', { 
    pageTitle: '', 
    node: utils.node, 
    notFound: utils.not_found 
  });
});


app.get('*', (req, res) => {
  res.redirect('/');
});


const port = config.APP_PORT;
app.listen(port, () => {
  middlewares.llog("Server Information:");
  console.table({
    "App Name": config.APP_NAME,
    "App Version": config.APP_VERSION,
    "App Paths": config.APP_PATH,
    "Server Name": utils.node,
    "Start Time": utils.currentTime,
    "Server URL": `http://${utils.ip}:${port}`,
  });
});
