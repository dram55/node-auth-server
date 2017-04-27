const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const secret = require('../config').secret;
const bcrypt = require('bcrypt-nodejs');

// Setup options for Local Strategy
const localOptions = {
  usernameField: 'email',
  session: false
}

// Create a Local Strategy
const localAuthentication = new LocalStrategy(localOptions, function(email, password, done) {
  // does this user exist?
  User.findOne({email:email}, function(err, user){
    if (err) return   done(err, false);
    if (!user) return done(null, false);
    user.comparePassword(password, function(err, isMatch){
      if (err) return done(err, false);
      if (!isMatch) return done(null, false);
      done(null, user);
    })
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

// Create a JWT Strategy
const jwtAuthentication = new JwtStrategy(jwtOptions, function(jwtPayload, done) {
  User.findById(jwtPayload.sub, function(err, user) {
    if (err){   return done(err, false)}
    if (user){  return done(null, user)}
    else {      return done(null, false)}
  });
});

// Tell passport to use our strategies
passport.use(jwtAuthentication);
passport.use(localAuthentication);