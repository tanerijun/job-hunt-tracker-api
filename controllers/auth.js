const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  // create user
  const user = await User.create({ ...req.body })

  // create token
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  // check if user exist and password is correct
  const user = await User.findOne({ email })
  if (user) {
    const isPasswordCorrect = await user.checkPassword(password)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid email or password')
    }
  } else {
    throw new UnauthenticatedError('Invalid email or password')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login,
}
