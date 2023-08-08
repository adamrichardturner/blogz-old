const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {
    text: {
      type: String,
      required: true,
    },
    giphyUrls: [String],
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const newBlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    text: {
      type: String,
      required: true,
    },
    giphyUrls: [String],
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Set a toJSON method to transform the object
newBlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blogs1', newBlogSchema, 'blogs1')
