const express = require('express');
const router = express.Router();

// User Controllers
const SignUpController = require('../Controllers/UserController/SignUpController');
const LoginController = require('../Controllers/UserController/LoginController')

// SignUp
router.route('/signup').post(SignUpController);

// Login

router.route('/login').post(LoginController)

module.exports = router;