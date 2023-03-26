const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const path = require('path');
// const session = require('express-session');

// ///////get login page from the frontend//////////
exports.loginPage = (req, res) => {
  return res.sendFile(path.resolve('../public/login.html'));
};

// ///////get registration page from the frontend//////////
exports.registerPage = (req, res) => {
  return res.sendFile(path.resolve('../public/reg.html'));
};

// //////get home page //////////////
exports.page = (req, res) => {
  return res.sendFile(path.resolve('../public/page.html'));
};

// /////// register new user and store in database ///////////
exports.register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // //hash user password before saving in database/////////
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
      res.redirect('/login');
    } catch (error) {
      res.status(400).json({
        success: 'false',
        message: 'Error, something went wrong'
      });
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
        req.session.user = userExist._id;
        req.session.isAuth = true;
        req.session.role = 'user';
        res.redirect('/page');
      } else {
        res.send('incorrect password or username');
      }
    } else {
      res.send('cannot find user, please register');
    }
  } catch (error) {
    res.status(400).json({
      success: 'false',
      message: 'Error, something went wrong'
    });
  }
};

// //////lougot user, delete session from db and clear cookie from browser///////
exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.clearCookie('connect.sid');
      res.redirect('/api/auth/login');
    } else {
      res.status(400).json({
        success: 'false',
        message: 'Error, something went wrong'
      });
    }
  });
};
