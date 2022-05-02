const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  // create user
  const user = await User.create({ ...req.body })

  // create token
  const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtsecret', {
    expiresIn: '30d',
  })
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = (req, res) => {
  res.send('Login route')
}

module.exports = {
  register,
  login,
}
