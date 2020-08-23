const userModel = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// signUp
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body

  const userFound = await userModel.findOne({ email })
  if (userFound) {
    return res.status(400).json({ errors: [{ msg: "A user with this email already exist" }] })
  }

  const salt = await bcrypt.genSaltSync(10)
  const hashed = await bcrypt.hash(password, salt)

  user = new userModel({
    name,
    email,
    password: hashed,
  })
  const savedUser = await user.save()
  if (!savedUser) {
    return res.status(500).json({ errors: [{ msg: "Error in saving user, please try again later" }] })
  }
  res.json({ success: "Thank you for registering, you can login now" })
}

// signIn
exports.signIn = async (req, res) => {
  const { email, password } = req.body

  const userWithEmailFound = await userModel.findOne({ email })
  if (!userWithEmailFound) {
    return res.status(400).json({ errors: [{ msg: "Incorrect email or password" }] })
  }

  const isMatch = await bcrypt.compare(password, userWithEmailFound.password)
  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: "Incorrect email or password" }] })
  }

  userWithEmailFound.password = undefined
  const token = jwt.sign({ id: userWithEmailFound.id }, process.env.JWT_KEY, { expiresIn: 31556926 })
  if (token) {
    res.json({ token, member: userWithEmailFound })
  } else {
    res.status(401).json({ errors: [{ msg: "Error in getting the tokens" }] })
  }
}

// get user profile (email)
exports.getProfile = async (req, res) => {
  const userFound = await userModel.findById(req.user.id)
  if (!userFound) {
    res.status(400).json({ errors: [{ msg: "No user profile was found" }] })
  }
  res.json({ userEmail: userFound.email })
}

// update user email
exports.updateEmail = async (req, res) => {
  const { email, password } = req.body

  const userFound = await userModel.findOne({ _id: req.user.id })
  if (!userFound) {
    return res.status(400).json({ errors: [{ msg: "Error finding user" }] })
  }

  const isMatch = await bcrypt.compare(password, userFound.password)
  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: "Incorrect password" }] })
  }

  const userUpdated = await userModel.findOneAndUpdate({ id: req.body.id }, { email }, { new: true })
  if (!userUpdated) {
    return res.status(400).json({ errors: [{ msg: "Error updating user" }] })
  }
  res.json({ success: "Email updated successufully" })
}

// update user password
exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body

  const userFound = await userModel.findOne({ _id: req.user.id })
  if (!userFound) {
    return res.status(400).json({ errors: [{ msg: "Error finding user" }] })
  }

  const isMatch = await bcrypt.compare(currentPassword, userFound.password)
  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: "Current password is incorrect" }] })
  }

  const salt = await bcrypt.genSaltSync(10)
  const hashed = await bcrypt.hash(newPassword, salt)
  const userUpdated = await userModel.findOneAndUpdate({ id: req.body.id }, { password: hashed }, { new: true })
  if (!userUpdated) {
    return res.status(400).json({ errors: [{ msg: "Error updating user" }] })
  }
  res.json({ success: "Password updated successufully" })
}
