const bcrypt = require('bcrypt');
const User = require('../models/userModel');
// const alert = require('../middleware/alert');
const path = require('path');

// ///////send login page from the frontend//////////
exports.loginPage = (req, res) => {
  return res.sendFile(path.join(__dirname, '../../frontend', 'login.html'));
};

// ///////send registration page from the frontend//////////
exports.registerPage = (req, res) => {
  return res.sendFile(path.join(__dirname, '../../frontend', 'reg.html'));
//   console.log(res.dir);
};

// /////// register new user and store in database ///////////
exports.register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // ////check for existing user before saving to database //////
  const exist = await User.findOne({ email: email });

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

//  ///// login user if already register///////
exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userExist = await User.findOne({ email: email });
  try {
    if (userExist) {
      const checkPassword = bcrypt.compareSync(password, userExist.password);
      if (checkPassword) {
        res.send('you have logged in');
      } else {
        res.send('incorrect password or username');
      }
    } else {
      res.send('cannot find user, please register');
    }
  } catch (error) {
    res.send(error);
  }
};
