require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// db
const connectDB = require('./db/connect')

// auth
const authUser = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const expressRateLimit = require('express-rate-limit')

// middlewares
app.set('trust proxy', 1) // Have to enable this if app is behind a reverse proxy (Heroku)
app.use(
  expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to {max} request for each windowMs
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

// routes
const homeHTML = `
<h3>Welcome to myJobsAPI</h3>
<p>Please consult the documentation for proper usage</p>
`

app.get('/', (req, res) => {
  res.send(homeHTML)
})

app.use('/api/v1/auth', authRouter)
// Only authenticated user can access the job route
app.use('/api/v1/jobs', authUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    // connect to db
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
