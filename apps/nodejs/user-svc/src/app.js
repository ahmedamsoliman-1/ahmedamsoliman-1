const express = require('express');
const bodyParser = require('body-parser');
const { getUser, createUser } = require('./user');
const ll = require('./middleware/utils');

const app = express();
app.use(bodyParser.json());

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

app.get('/users', (req, res) => {
  ll.llog("Users returned");
  res.json(users);
});

app.get('/users/:userId', (req, res) => {
  const user = getUser(req.params.userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.post('/users', (req, res) => {
  const user = createUser(req.body);
  res.status(201).json(user);
});


const port = process.env.PORT || 5000;
const node = require("os").hostname();
const currentDate = new Date();
const currentTime = currentDate.toLocaleString();

app.listen(port, () => {
  ll.llog("Service Information:");
  console.table({
    "App Name": 'ServiceHub-Users-SVC',
    "Server Name": node,
    "Start Time": currentTime,
    "Server URL": `http://localhost:${port}`,
  });
});