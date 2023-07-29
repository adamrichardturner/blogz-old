// Importing necessary modules
const bcrypt = require('bcrypt') // Password hashing library
const usersRouter = require('express').Router() // Express router
const User = require('../models/user') // User model

// Route for creating a new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body // Extracting username, name and password from the request body

  // Validating the password length and sending a 400 Bad Request error if it's less than 3 characters
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Password length must be at least 3 characters' })
  }

  // Hashing the password with bcrypt and the number of salt rounds
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Creating a new User object with username, name, and the hashed password
  const user = new User({
    username,
    name,
    passwordHash,
  })

  // Saving the user to the database and sending a 201 Created response with the saved user information
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// Route for retrieving all users and their associated blogs
usersRouter.get('/', async (request, response) => {
  // Finding all users in the database and populating their blogs with the specified fields
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })

  // Sending a 200 OK response with the retrieved users and their blogs
  response.json(users)
})

// Exporting the users router module
module.exports = usersRouter
