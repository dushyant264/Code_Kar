const express = require('express');
const router = express.Router();

// middleware

const auth = require('../middleware/auth')

// User Controllers
const SignUpController = require('../Controllers/UserController/SignUpController')
const LoginController = require('../Controllers/UserController/LoginController')
const GetUserController = require('../Controllers/UserController/GetUserController')
const LeaderboardController = require('../Controllers/UserController/LeaderboardController')

// SignUp

router.route('/signup').post(SignUpController);

// Login

router.route('/login').post(LoginController)

// Get User

router.route('/user').get(auth,GetUserController)       

// Get Leaderboard

router.route('/leaderboard').get(auth,LeaderboardController)

module.exports = router;