const mongoose = require('mongoose')
const OldBlog = require('../models/blog') // renamed from Blog to OldBlog
const NewBlog = require('../models/newmodels/blog')
const User = require('../models/user') // assuming this is the correct path to the User model

mongoose.connect('***MONGODB URI***', {
  // Hide your connection string
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const specificDate = new Date('2023-08-01T13:00:00Z')

const migrateData = async () => {
  try {
    const oldBlogs = await OldBlog.find({})

    for (const oldBlog of oldBlogs) {
      // Check for empty or missing title
      if (!oldBlog.title || oldBlog.title.trim() === '') {
        console.error('Invalid title detected for blog with ID:', oldBlog._id)
        continue
      }

      let blogTitle =
        oldBlog.title.trim() !== ''
          ? oldBlog.title
          : 'A Blogz Title should go here...'
      let blogContent =
        oldBlog.url.trim() !== ''
          ? oldBlog.url
          : 'Some content should go here, right?'
      const likesArray = Array(oldBlog.likes).fill(oldBlog.user)

      let newBlogData = {
        title: blogTitle,
        content: {
          text: blogContent,
          giphyUrls: [],
        },
        likedBy: likesArray,
        user: oldBlog.user,
        comments: oldBlog.comments.map((comment) => {
          let commentContent =
            comment.trim() !== '' ? comment : 'This is a sample comment.'
          return {
            content: {
              text: commentContent,
              giphyUrls: [],
            },
            likedBy: [],
            user: null,
            timestamp: specificDate,
          }
        }),
        createdAt: specificDate,
        updatedAt: specificDate,
      }

      const newBlog = new NewBlog(newBlogData)
      await newBlog.save()

      // Update user's blogs array to reference this new blog
      await User.findByIdAndUpdate(oldBlog.user, {
        $push: { blogs: newBlog._id },
      })
    }

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Error during migration:', error)
    await mongoose.disconnect()
    process.exit(1)
  }
}

migrateData()
