// Start by importing the mongoose library.
const mongoose = require('mongoose')

// Define schema for the blog data.
const blogSchema = new mongoose.Schema(
  {
    // 'title' and 'content' for blogs
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    // Array of user IDs indicating who has liked the blog.
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    // The creator of the blog.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    // Array for storing multiple comment objects for the blog.
    comments: [
      {
        // 'content' inside 'comments' is also set as required.
        content: {
          type: String,
          required: true,
        },

        // Array of user IDs indicating who has liked the comment.
        likedBy: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],

        // The creator of the comment.
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },

        // Timestamp for when the comment was created.
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    // This 'timestamps' option adds 'createdAt' and 'updatedAt' fields to the schema.
    timestamps: true,
  }
)

// Virtual property to calculate the number of likes for a blog from 'likedBy' array.
blogSchema.virtual('likes').get(function () {
  return this.likedBy.length
})

// Custom transformation for JSON representation of the object.
blogSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// Compile the schema into a model named 'Blog'.
module.exports = mongoose.model('Blog', blogSchema)
