const express = require('express')
const router = express.Router()

// Middleware
const auth = require('../middleware/auth')
const checkAdmin = require('../middleware/checkAdmin')

// Admin Controllers

const AddProblemController = require('../Controllers/AdminController/AddProblemController')
const EditProblemController = require('../Controllers/AdminController/EditProblemController')

// Add Problem
router.route('/problem').post(auth,checkAdmin,AddProblemController)

// Edit Problem
router.route('/problem/:id').put(auth,checkAdmin,EditProblemController)

module.exports = router;