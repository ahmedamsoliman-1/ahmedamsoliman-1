const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const ll = require('./middleware/utils');
const prometheus = require('./prometheus');

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(prometheus.countRequests);
app.get('/metrics', prometheus.getMetrics);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

const port = process.env.PORT || 8080;
const node = require("os").hostname();
const currentDate = new Date();
const currentTime = currentDate.toLocaleString();

app.listen(port, () => {
  ll.llog("Service Information:");
  console.table({
    "App Name": 'ServiceHub-Frontend-SVC',
    "Server Name": node,
    "Start Time": currentTime,
    "Server URL": `http://localhost:${port}`,
  });
});
