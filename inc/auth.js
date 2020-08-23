const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ errors: [{ msg: "Authorization header is missing" }] })
  }

  const token = authorization.replace("Bearer ", "")
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.user = decoded
  } catch (err) {
    console.log(err)
    return res.status(401).json({ errors: [{ msg: "Not authorized" }] })
  }

  next()
}
