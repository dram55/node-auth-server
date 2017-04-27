const User = require('../models/user');
const jwt = require('jwt-simple');
const secret = require('../config').secret;

function createJwtFromUser(user) {
  const payload = {iss:"MyAuthenticationApp", sub:user.id};
  const token = jwt.encode(payload, secret, "HS256");
  return token;
}

exports.signup = function(req, res, next) {
  // Pull user details off request body.
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Does user already exist?
  User.findOne({email:email}, function(err, existingUser) {
    if (err) {return next(res.json(err))};
    if (existingUser) {
      return res.status(422).send({error: "User already exists."});
    }

   // Create new User and save the user
    const newUser = new User({name:name, email:email, password:password});
    newUser.save(function(err) {
      if (err) return (next(res.json(err)));
      const token = createJwtFromUser(newUser);
      return res.send({token:token});
    });
  });
}

exports.login = function(req, res, next) {
  // We can expect the user to be on req from our localAuthentication strategy in passport.js
  // Simply make a token with that user id and return.
  const token = createJwtFromUser(req.user);
  res.send({token:token});
}
