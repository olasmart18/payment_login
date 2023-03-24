const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const alert = require('../middleware/alert');
const path = require('path');
// const ft = require('')

exports.loginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend', 'login.html'));
};

exports.registerPage = (req, res) => {
  return res.sendFile(path.join(__dirname, '../../frontend', 'reg.html'));
//   console.log(res.dir);
};

exports.register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const exist = User.findOne(email);
  if (!exist) {
    const newUser = new User({
      email: email,
      password: hash,
      country: req.body.country,
      number: req.body.number
    });
    try {
      await newUser.save();
      // alert();
      res.send('success');
    } catch (error) {
      res.send('error');
    }
  } else {
    res.send('user already exist');
  }
};

exports.login = async (req, res) => {

};
