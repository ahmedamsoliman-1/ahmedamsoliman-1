const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const ll = require('./middleware/utils');
require('dotenv').config();
const db = require('./db');

const app = express();

const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // Import passport configuration

app.use(session({
  secret: 'your_secret_key', // Change this to a more secure key
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(indexRouter);
app.use(authRouter);

const port = process.env.PORT || 8080;
const node = require("os").hostname();
const currentDate = new Date();
const currentTime = currentDate.toLocaleString();

app.listen(port, () => {
  ll.llog("Service Information:");
  ll.llog(`Environment ${process.env.ENV}`);
  console.table({
    "App Name": 'AAMS-Links-SVC',
    "Server Name": node,
    "Start Time": currentTime,
    "Server URL": `http://localhost:${port}`,
  });
});
