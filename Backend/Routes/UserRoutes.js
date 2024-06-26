const express = require('express');
const router = express.Router();

// middleware

const auth = require('../middleware/auth')

// User Controllers
const SignUpController = require('../Controllers/UserController/SignUpController')
const LoginController = require('../Controllers/UserController/LoginController')
const GetUserController = require('../Controllers/UserController/GetUserController')
const LeaderboardController = require('../Controllers/UserController/LeaderboardController')
const GetProblemController = require('../Controllers/UserController/GetProblemController')

// SignUp

router.route('/signup').post(SignUpController);

// Login

router.route('/login').post(LoginController)

// Get User

router.route('/user').get(auth,GetUserController)       

// Get Leaderboard

router.route('/leaderboard').get(auth,LeaderboardController)

// Get Problem

router.route('/problem/:slug').get(auth,GetProblemController)

// Get All Problems

module.exports = router;