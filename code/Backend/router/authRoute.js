const express = require('express');
const router = express.Router();
const {

  register,
  registerPage,
  login,
  loginPage

} = require('../controller/userController');

router.route('/register')
  .get(registerPage) // get method
  .post(register); // post method

router.route('/login')
  .get(loginPage)
  .post(login);

module.exports = router;
