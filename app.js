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

app.use(express.json())
// extra packages

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
