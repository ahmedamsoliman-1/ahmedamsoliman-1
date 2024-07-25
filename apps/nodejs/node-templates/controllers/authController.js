const userService = require('../services/userService');

const passport = require('../passportConfig');



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.message = `User ${req.user.username} is authenticated`;
    return next(); 
  }

  res.locals.message = 'User is not authenticated';
  res.redirect('/auth/login'); 
}


const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ 
        message: 'Login failed. Please try again', 
        detailed_error: err 
      });
    }
    if (!user) {
      res.locals.message = 'Invalid username or password';
      res.redirect('/auth/login'); 
      return;
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed. Please try again', detailed_error: err });
      }
      res.locals.message = `User ${user.username} logged in Successfully`;
      res.redirect('/'); 
    });
  })(req, res, next);
};

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userService.getUserByUsername(username);

    if (existingUser.rowLength > 0) {
      res.locals.message = `User ${username} already exists`;
      res.redirect('/auth/signup'); 
    } else {
      await userService.createUser(username, password);
      res.locals.message = `User @${username} created successfully`;
      res.redirect('/auth/login'); 
    }
  } catch (error) {
    console.log(error);
    res.locals.message = 'Signup failed. Please try again.';
    res.status(500).json({ message: res.locals.message });
  }
};

const logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error(err);
        res.locals.message = 'Logout failed. Please try again';
        return res.status(500).json({ message: res.locals.message });
      }
      res.clearCookie('sessionCookie');
      res.locals.message = 'Logout Successful';

      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
    res.locals.message = 'Logout failed. Please try again';
    res.status(500).json({ message: res.locals.message });
  }
};



module.exports = {
  signup,
  login,
  logout,
  ensureAuthenticated,
};
