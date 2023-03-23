const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  number: Number,
  country: {
    type: String,
    require: true
  }
}, { timestamp: true });

const User = new mongoose.model('User', userSchema);

module.exports = User;
