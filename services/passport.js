const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const secret = require('../config').secret;

// Setup options for JWT Strategy
const jwtOptions = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

// Create a JWT Strategy
const jtwLogin = new JwtStrategy(jwtOptions, function(jwtPayload, done) {
  User.findById(jwtPayload.sub, function(err, user) {
    if (err){   return done(err, false)}
    if (user){  return done(null, user)}
    else {      return done(null, false)}
  });
});

// Tell passport to use this strategy
passport.use(jtwLogin);