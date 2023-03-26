const express = require('express');
const {

  register,
  registerPage,
  login,
  loginPage,
  logout,
  page

} = require('../controller/userController');
const isUser = require('../middleware/auth').isAuth;

const router = express.Router();

router.route('/api/auth/register')
  .get(registerPage) // get method
  .post(register); // post method

router.route('/api/auth/login')
  .get(loginPage)
  .post(login);

router.post('/logout', logout);

router.get('/page', isUser, page);

module.exports = router;
