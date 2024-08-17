const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

// Register route
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    res.status(400).send('Error registering new user');
  }
});

// Login route
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
