const mongoose = require('mongoose') // Import mongoose library for MongoDB operations

// Define a schema for comments
const commentSchema = new mongoose.Schema({
  content: {
    text: {
      // Each comment will have a text field
      type: String, // This field will store strings
      required: true,
    },
    giphyUrls: [String], // Array of Giphy URLs associated with the comment
  },
  likedBy: [
    // Array of users who liked the comment
    {
      type: mongoose.Schema.Types.ObjectId, // User ID reference
      ref: 'User', // Refers to the 'User' model
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId, // User who posted the comment
    ref: 'User', // Refers to the 'User' model
  },
  timestamp: {
    type: Date, // When the comment was posted
    default: Date.now, // Default to current time
  },
})

// Define a schema for blogs
const newBlogSchema = new mongoose.Schema({
  title: {
    type: String, // Title of the blog
    required: true,
  },
  content: {
    text: {
      // Content of the blog
      type: String, // This field will store strings
      required: true,
    },
    giphyUrls: [String], // Array of Giphy URLs associated with the blog
  },
  likedBy: [
    // Array of users who liked the blog
    {
      type: mongoose.Schema.Types.ObjectId, // User ID reference
      ref: 'User', // Refers to the 'User' model
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId, // User who posted the blog
    ref: 'User', // Refers to the 'User' model
  },
  comments: [commentSchema], // An array of comments using the commentSchema
  createdAt: {
    type: Date, // When the blog was created
    default: Date.now, // Default to current time
  },
  updatedAt: {
    type: Date, // When the blog was last updated
    default: Date.now, // Default to current time
  },
})

// Set a toJSON method to transform the object
newBlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Convert _id to string and rename it to id
    delete returnedObject._id // Remove the _id field
    delete returnedObject.__v // Remove the version key (__v) added by MongoDB
  },
})

module.exports = mongoose.model('Blog', newBlogSchema, 'blogs1')
