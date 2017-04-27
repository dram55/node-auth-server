const User = require('../models/user');

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
      return res.send(newUser);
    });
  });
  }
