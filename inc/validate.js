const { body, validationResult } = require("express-validator")

exports.validateSignUp = [
  body("name", "Name min characters is 2").isLength({ min: 2 }),
  body("email", "Email is not valid").isEmail(),
  body("password", "Password min characters is 6").isLength({ min: 6 }),
  body("passwordAgain").custom((value, { req, loc, path }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords don't match")
    } else {
      return true
    }
  }),
  body("agreed", "You need to agre to our TOS").isIn(["true"]),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    next()
  },
]

exports.validateSignIn = [
  body("email", "Email is not valid").isEmail(),
  body("password", "Password min characters is 6").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    next()
  },
]

exports.validateEmailUpdate = [
  body("email", "Email is not valid").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    next()
  },
]

exports.validatePasswordUpdate = [
  body("newPassword", "Password min characters is 6").isLength({ min: 6 }),
  body("ConfirmNewPassword").custom((value, { req, loc, path }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Passwords don't match")
    } else {
      return true
    }
  }),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    next()
  },
]

exports.validateNewPaste = [
  body("pasteContent", "Paste is empty").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    next()
  },
]

exports.validateEditPaste = [
  body("title", "Title is empty").not().isEmpty(),
  body("paste", "Paste is empty").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    next()
  },
]
