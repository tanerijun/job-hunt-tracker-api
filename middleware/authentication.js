const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication error')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // Pass the user to "job" route
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication error')
  }
}

module.exports = auth
