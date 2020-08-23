const express = require("express")
const router = express.Router()
const pasteController = require("../controllers/pasteController")
const Auth = require("../inc/auth")
const { validateNewPaste, validateEditPaste } = require("../inc/validate")

// @route  POST /paste/new
// @desc   Create new paste
// @access Public
router.post("/new", validateNewPaste, pasteController.New)

// @route  POST /paste/my-pastes
// @desc   Get all pastes by user
// @access Private
router.post("/my-pastes", Auth, pasteController.ViewAllByUser)

// @route  POST /paste/edit/:shortUrl
// @desc   Edit paste
// @access Private
router.post("/edit/:shortUrl", [Auth, validateEditPaste], pasteController.Edit)

// @route  GET /paste/:shortUrl
// @desc   Get paste by shortUrl
// @access Public
router.get("/:shortUrl", pasteController.ViewSingle)

module.exports = router
