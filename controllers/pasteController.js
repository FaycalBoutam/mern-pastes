const pasteModel = require("../models/paste")

// create new paste
exports.New = async (req, res) => {
  const { title, pasteContent, user } = req.body

  const paste = new pasteModel({
    title,
    paste: pasteContent,
    user,
  })

  const pasteSaved = await paste.save()
  if (!pasteSaved) {
    return res.status(500).json({ errors: [{ error: "Error saving paste" }] })
  }
  res.json({ paste, success: "Paste saved successfully" })
}

// view all pastes by user
exports.ViewAllByUser = async (req, res) => {
  const pastes = await pasteModel.find({ user: req.user.id })
  if (!pastes) {
    return res.status(404).json({ errors: [{ error: "Paste not found" }] })
  }
  res.json({ pastes })
}

// view signle paste
exports.ViewSingle = async (req, res) => {
  const paste = await pasteModel.findOne({ shortUrl: req.params.shortUrl }).populate("user", "name")
  if (!paste) {
    return res.status(404).json({ errors: [{ error: "Paste not found" }] })
  }
  paste.views++
  await paste.save()

  res.json({ paste })
}

// edit paste
exports.Edit = async (req, res) => {
  const { title, paste } = req.body

  const pasteFound = await pasteModel.findOne({ shortUrl: req.params.shortUrl })
  if (!pasteFound) {
    return res.status(404).json({ errors: [{ error: "Paste not found" }] })
  }

  if (req.user.id.toString() !== pasteFound.user.toString()) {
    return res.status(403).json({ errors: [{ error: "You're not authorized to edit this paste" }] })
  }

  const pasteUpdated = await pasteModel.findOneAndUpdate({ shortUrl: req.params.shortUrl }, { title, paste }, { new: true })
  if (!pasteUpdated) {
    return res.status(400).json({ errors: [{ msg: "Error updating paste" }] })
  }
  res.json({ success: "Paste updated successufully" })
}
