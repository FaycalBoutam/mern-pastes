const express = require("express")
const router = express.Router()
const Auth = require("../inc/auth")
const userController = require("../controllers/userController")
const { validateSignUp, validateSignIn, validateEmailUpdate, validatePasswordUpdate } = require("../inc/validate")

// @route  POST /user/signup
// @desc   Register a new user
// @access Public
router.post("/signup", validateSignUp, userController.signUp)

// @route  POST /user/signin
// @desc   User login
// @access Public
router.post("/signin", validateSignIn, userController.signIn)

// @route  GET /user/profile/me
// @desc   Get user email
// @access Private
router.get("/profile/me", Auth, userController.getProfile)

// @route  POST /user/profile/me/update-email
// @desc   Update user email
// @access Private
router.post("/profile/me/update-email", [Auth, validateEmailUpdate], userController.updateEmail)

// @route  POST /user/profile/me/update-password
// @desc   Update user password
// @access Private
router.post("/profile/me/update-password", [Auth, validatePasswordUpdate], userController.updatePassword)

module.exports = router
