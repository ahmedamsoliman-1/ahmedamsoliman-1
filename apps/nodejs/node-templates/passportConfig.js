//passportConfig.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('./services/userService');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userService.getUserByUsername(username);

      if (!user || user.rowLength === 0 || user['rows'][0]['password'] !== password) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user['rows'][0]); // Return the user object directly
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  // console.log("Serializing User:", user);
  done(null, user.username); // Serialize with the username
});

passport.deserializeUser(async (username, done) => {
  try {
    // console.log("Deserializing User:", username);
    const user = await userService.getUserByUsername(username);
    // console.log("Retrieved User:", user);
    done(null, user['rows'][0]); // Deserialize using the retrieved user
  } catch (error) {
    console.error("Deserialization Error:", error);
    done(error);
  }
});




module.exports = passport;
