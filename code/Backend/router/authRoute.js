const express = require('express');
const router = express.Router();
const {

  register,
  registerPage,
  login,
  loginPage

} = require('../controller/userController');

router.route('/auth/register')
  .get(registerPage) // get method
  .post(register); // post method

router.route('/auth/login')
  .get(loginPage)
  .post(login);

module.exports = router;
