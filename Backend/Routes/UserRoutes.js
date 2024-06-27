const express = require('express');
const router = express.Router();

// middleware

const auth = require('../middleware/auth')

// User Controllers
const SignUpController = require('../Controllers/UserController/SignUpController')
const LoginController = require('../Controllers/UserController/LoginController')
const GetUserController = require('../Controllers/UserController/GetUserController')
const LeaderboardController = require('../Controllers/UserController/LeaderboardController')
const GetProblemController = require('../Controllers/UserController/GetProblemController');
const getAllProbController = require('../Controllers/UserController/getAllProbController');
const checkProblemController = require('../Controllers/UserController/checkProblem');
const RunCodeController = require('../Controllers/UserController/runCode');

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

router.route('/problem').get(auth,getAllProbController)

// run code

router.route('/run').post(auth,RunCodeController)

// check problem

router.route('/check/:slug').post(auth,checkProblemController)

module.exports = router;