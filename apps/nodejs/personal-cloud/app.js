// require('newrelic');
const express = require("express");
const app = express();
const node = require("os").hostname();
const ip = require("ip").address();
require('dotenv').config();


const { setupMetrics } = require('./metrics');


setupMetrics(app); const currentDate = new Date();

const currentTime = currentDate.toLocaleString();

const port = process.env.NODE_PORT || 3004;


const ll = require('./middleware/utils');

const index = require("./routes/index");
const k8 = require("./routes/k8");

const cors = require('cors');

const middlewares = require("./middleware/utils");


app.use(middlewares.addTimestamp);
app.use(middlewares.logger);

app.use(cors());

app.set("view engine", "ejs");

app.use(index);
app.use(k8);





app.use(express.static(__dirname + "/public"));



app.listen(port, () => {
  ll.llog("Server Information:");
  console.table({
    "App Name": 'Avrioc Cloud',
    "Server Name": node,
    "Start Time": currentTime,
    "Server URL": `http://${ip}:${port}`,
  });
});

