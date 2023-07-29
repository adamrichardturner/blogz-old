// Importing necessary modules
require('dotenv').config() // Loading environment variables
const config = require('./utils/config') // Custom configuration module
const express = require('express') // Express library
require('express-async-errors') // Error handling for async/await functions
const app = express() // Creating an Express app
const cors = require('cors') // Cross-Origin Resource Sharing library
const blogsRouter = require('./controllers/blogs') // Blogs router
const usersRouter = require('./controllers/users') // Users router
const loginRouter = require('./controllers/login') // Login router
const middleware = require('./utils/middleware') // Custom middleware
const logger = require('./utils/logger') // Custom logger module
const mongoose = require('mongoose') // Mongoose library
const morgan = require('morgan') // HTTP request logger middleware

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

// Run static build if present
app.use(express.static('build'))

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

// Using custom unknown endpoint middleware
app.use(middleware.unknownEndpoint)

// Using custom error handler middleware
app.use(middleware.errorHandler)

// Exporting the Express app
module.exports = app
