// Importing necessary modules
const jwt = require('jsonwebtoken') // JSON Web Tokens library
const bcrypt = require('bcrypt') // Password hashing library
const loginRouter = require('express').Router() // Express router
const User = require('../models/user') // User model

// Login route to authenticate user
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body // Extracting username and password from the request body

  // Finding the user with the given username
  const user = await User.findOne({ username })

  // Checking if the password is correct by comparing it with the hashed password in the database
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  // If the user or the password is incorrect, sending a 401 Unauthorized error with an error message
  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  // Creating a new object with user's username and id for generating the token
  const userForToken = { username: user.username, id: user._id }

  // Generating a JSON Web Token with user information, a secret key, and an expiration time of 12 months
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 31557600, // This equals 12 months
  })

  // Sending a 200 OK response with the generated token and user information
  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id })
})

// Exporting the login router module
module.exports = loginRouter
