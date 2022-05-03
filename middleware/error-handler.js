const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later',
  }

  // Handle mongoose schema validation error
  if (err.name === 'ValidationError') {
    // Iterate through array of validation errors, there might be multiple errors, e.g email, password
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  // Handle duplicate email on registration
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value for ${Object.keys(
      err.keyValue
    )} field detected`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  // Handle cast error
  if (err.name === 'CastError') {
    customError.msg = `No item found with ID ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
