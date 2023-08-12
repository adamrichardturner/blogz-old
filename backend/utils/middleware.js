const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      request.decodedToken = decodedToken
    } catch (err) {
      return next(err)
    }
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.method !== 'POST' && request.method !== 'DELETE') {
    return next()
  }

  if (request.decodedToken && request.decodedToken.id) {
    request.user = await User.findById(request.decodedToken.id)
  }
  next()
}

const errorHandler = (error, request, response) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Invalid ID format' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.message === 'jwt must be provided') {
    return response.status(401).json({ error: 'Token missing or invalid' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' }) // Changed 400 to 401 to indicate unauthorized
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token has expired' })
  }

  // Handling general unexpected errors
  response.status(500).json({ error: 'Internal server error' })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
