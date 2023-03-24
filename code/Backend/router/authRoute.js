const express = require('express');
const router = express.Router();
const {

  register,
  registerPage,
  login,
  loginPage

} = require('../controller/userController');

// router.route('/auth/register').get(registerPage).post(register);
router.get('/auth/register', registerPage);
router.get('/auth/login', loginPage);
router.post('/auth/login', login);
router.post('/auth/register', register);

module.exports = router;
