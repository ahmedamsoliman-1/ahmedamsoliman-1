/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: User already exists or invalid input
 *       '500':
 *         description: Signup failed
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Login failed
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Logout successful
 *       '500':
 *         description: Logout failed
 */


const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const authController = require('../controllers/authController');

router.get('/profile', (req, res) => {
    res.render('auth/profile', {
      user: req.user,
      time: new Date(),
      pageTitle: 'Profile',
    });
    res.locals.message = `Profile Page Loaded!`;
});

router.get('/profile/edit', (req, res) => {
  const user = new User(req.user);
  res.render('auth/profile-edit', {
    user: req.user,
    time: new Date(),
    pageTitle: 'Profile Edit',
  });
  res.locals.message = `Edit Profile Page Loaded!`;
});

router.get('/signup', (req, res) => {
    res.render('auth/signup', {
      user: req.user, 
      time: new Date(),
      pageTitle: 'Signup',
    });
    res.locals.message = `Signup Page Loaded!`;
});

router.get('/login', (req, res) => {
    res.render('auth/login', {
      user: req.user, 
      time: new Date(),
      pageTitle: 'Login',
    });
    res.locals.message = `Login Page Loaded!`;
});


// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);



router.post('/profile/edit', async (req, res) => {
  try {
    const { username, email, phone, password, first_name, last_name, user_avatar } = req.body;
    const user = new User(username);
    for (v in req.body) {
      await user.updateUser(username, v, req.body[v]);
    }
    // await user.updateUser(username, 'email', email);
    // await user.updateUser(username, 'phone', mobile);
    // await user.updateUser(username, 'password', password);
    // await user.updateUser(username, 'first_name', fname);
    // await user.updateUser(username, 'last_name', lname);
    // await user.updateUser(username, 'user_avatar', avatar);

    res.locals.message = 'User Updated';
    res.redirect('/auth/profile');
  } catch (error) {
    console.log(error);
    res.locals.message = 'Signup failed. Please try again.';
    res.status(500).json({ message: res.locals.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password, avatar } = req.body;
    const user = new User(username, password, avatar);
    const result = await user.save();
    res.locals.message = result.message;
    res.redirect(result.message.includes('created') ? '/auth/login' : '/auth/signup');
  } catch (error) {
    console.log(error);
    res.locals.message = 'Signup failed. Please try again.';
    res.status(500).json({ message: res.locals.message });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = new User(username, password);
    await user.login(req, res, next);
  } catch (error) {
    console.log(error);
    res.locals.message = 'Login failed. Please try again.';
    res.status(500).json({ message: res.locals.message });
  }
});

router.get('/logout', async (req, res) => {
  try {
    const user = new User();
    await user.logout(req, res);
  } catch (error) {
    console.error(error);
    res.locals.message = 'Logout failed. Please try again';
    res.status(500).json({ message: res.locals.message });
  }
});


module.exports = router;
