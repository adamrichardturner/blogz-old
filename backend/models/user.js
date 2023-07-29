// Importing necessary modules
const mongoose = require('mongoose') // Mongoose library
const uniqueValidator = require('mongoose-unique-validator') // Unique validation plugin for Mongoose

// Defining the user schema with the necessary fields and validators
const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
  username: {
    type: String,
    required: true,
    unique: true, // Ensuring username is unique
    validate: {
      validator: (username) => {
        return username && username.length >= 3
      },
      message: 'Username should be at least 3 characters long',
    },
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
})

// Transforming the user schema object to a JSON object to remove unnecessary fields and include the id field
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

// Adding unique validation plugin to the user schema
userSchema.plugin(uniqueValidator)

// Creating the User model with the user schema
const User = mongoose.model('User', userSchema)

// Exporting the User model
module.exports = User
