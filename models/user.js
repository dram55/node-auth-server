const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  name:  {type: String, required: true},
  email: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true}
});

// Create a user Model class
const User = mongoose.model('user', userSchema);

// Export Model
module.exports = User;