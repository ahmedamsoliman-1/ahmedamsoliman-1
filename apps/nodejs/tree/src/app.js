const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ll = require('./middleware/utils');


const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const fileTreeRouter = require('./routes/index');

app.use('/', fileTreeRouter);

const port = process.env.PORT || 8080;
const node = require("os").hostname();
const currentDate = new Date();
const currentTime = currentDate.toLocaleString();

app.listen(port, () => {
  ll.llog("Service Information:");
  console.table({
    "App Name": 'AAMS-Tree',
    "Server Name": node,
    "Start Time": currentTime,
    "Server URL": `http://localhost:${port}`,
  });
});
