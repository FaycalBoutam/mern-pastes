const express = require("express")
const app = express()

const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const userRouter = require("./routes/users")
const pastetRouter = require("./routes/pastes")

// connect to DB
require("./inc/db")

app.use(express.json({ extended: false }))
app.use(cors())
app.use("/user", userRouter)
app.use("/paste", pastetRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"))
}

app.listen(process.env.PORT)
