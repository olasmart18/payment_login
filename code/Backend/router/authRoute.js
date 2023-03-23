const express = require('express');
const router = express.Router();
const {
  register,
  login
} = require('../controller/userController');

router.get('/register', register);
router.get('/login', login);

module.exports = router;
