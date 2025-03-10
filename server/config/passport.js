// config/passport.js
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserModel');

module.exports = function() {
  // LocalStrategy expects usernameField, passwordField, etc.
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' }, // "usernameField" is "email"
      async (email, password, done) => {
        try {
          // 1) Find user by email
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'No user with that email' });
          }

          // 2) Check password
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
          }

          // 3) If everything is correct
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // 4) Serialize user (store user.id in the session)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 5) Deserialize user (retrieve user from the session by id)
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
