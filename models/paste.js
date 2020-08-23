const mongoose = require("mongoose")
const shortId = require("shortid")

const pasteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  paste: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
})

module.exports = mongoose.model("Paste", pasteSchema)
