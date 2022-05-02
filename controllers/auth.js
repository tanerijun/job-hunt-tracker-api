const register = (req, res) => {
  res.send('Register route')
}

const login = (req, res) => {
  res.send('Login route')
}

module.exports = {
  register,
  login,
}
