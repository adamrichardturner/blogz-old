require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

// Disable strict query handling in Mongoose
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

// Connecting to MongoDB with Mongoose
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// Setting up CORS middleware
app.use(cors())

// Run static build if present from the new location
app.use(express.static('/home/blogz_dev/public_html'))

// Parsing JSON data with Express
app.use(express.json())

// Using custom request logger middleware
app.use(middleware.requestLogger)

// Using custom token extractor middleware
app.use(middleware.tokenExtractor)

// Defining Morgan Tiny logging
morgan.token('body', function (request) {
  return JSON.stringify(request.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// Using the blogs router with custom user extractor middleware
app.use('/api/blogs', middleware.userExtractor, blogsRouter)

// Using the users router
app.use('/api/users', usersRouter)

// Using the login router
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// Serve the React app from the new location for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join('/home/blogz_dev/public_html', 'index.html'))
})

// Using custom unknown endpoint middleware
app.use(middleware.unknownEndpoint)

// Using custom error handler middleware
app.use(middleware.errorHandler)

module.exports = app
