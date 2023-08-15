// Importing necessary modules
const bcrypt = require('bcrypt') // Password hashing library
const usersRouter = require('express').Router() // Express router
const User = require('../models/user') // User model

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  try {
    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username: username })
    if (existingUser) {
      return response.status(400).json({ error: 'Username already exists' })
    }

    // Validate username
    if (!username || typeof username !== 'string' || username.trim() === '') {
      return response.status(400).json({ error: 'Invalid username' })
    }

    // Validate name
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return response.status(400).json({ error: 'Invalid name' })
    }

    // Validate password length and number presence
    if (password.length < 5 || !/\d/.test(password)) {
      return response.status(400).json({
        error:
          'Password must be at least 5 characters long and contain a number',
      })
    }

    // Hash the password with bcrypt and the number of salt rounds
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create a new User object with username, name, and the hashed password
    const user = new User({
      username,
      name,
      passwordHash,
    })

    // Save the user to the database and send a 201 Created response with the saved user information
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response
      .status(500)
      .json({ error: 'An error occurred during user registration' })
  }
})

// Route for retrieving all users and their associated blogs
usersRouter.get('/', async (request, response) => {
  // Finding all users in the database and populating their blogs with the specified fields
  const users = await User.find({}).populate('blogs', {
    // Assuming 'blogs' is the field in the User model referencing the Blog model
    title: 1,
    'content.text': 1, // Getting the text content of the blog
    user: 1, // This will give the ObjectId of the user who wrote each blog. If you want the actual user details, you might have to do a deeper population.
    likedBy: 1, // This will give an array of ObjectIds of users who liked the blog.
    // Add/remove fields as per your requirement.
  })

  // Sending a 200 OK response with the retrieved users and their blogs
  response.json(users)
})

// Exporting the users router module
module.exports = usersRouter
