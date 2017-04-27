const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  name:  {type: String, required: true},
  email: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true}
});

userSchema.pre('save', function(next){
  const user = this;
  bcrypt.genSalt(10,function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hashedPassword) {
      if (err) return next(err);
      user.password = hashedPassword;
      next();
    });
  });
}); 

userSchema.methods.comparePassword = function(newPassword, callback){
      // bcrypt compares password from request against salt+hashed password from our db.
    bcrypt.compare(newPassword, this.password, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    });
}

// Create a user Model class
const User = mongoose.model('user', userSchema);

// Export Model
module.exports = User;