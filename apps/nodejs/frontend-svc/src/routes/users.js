const express = require('express');
const axios = require('axios');
const router = express.Router();
const ll = require('../middleware/utils');


const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5000/users';
ll.llog('Users service URL: ' + USER_SERVICE_URL);


router.get('/', async (req, res) => {
  try {
    const response = await axios.get(USER_SERVICE_URL);
    ll.llog('Users fetched: ' + response.data.length);
    res.render('users', { users: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req, res) => {
  try {
    await axios.post(USER_SERVICE_URL, req.body);
    ll.llog('User created');
    res.redirect('/users');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;
