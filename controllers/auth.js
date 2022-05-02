const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const register = async (req, res) => {
  // create user
  const user = await User.create({ ...req.body })

  // create token
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = (req, res) => {
  res.send('Login route')
}

module.exports = {
  register,
  login,
}
