const mongoose = require('mongoose')
const Blog = require('../../blog')
const NewBlog = require('../blog')

mongoose.connect('**MongoDB Connection String**', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const specificDate = new Date('2023-08-01T13:00:00Z')

const migrateData = async () => {
  try {
    const oldBlogs = await Blog.find({})

    for (const oldBlog of oldBlogs) {
      // Check for empty or missing title
      if (!oldBlog.title || oldBlog.title.trim() === '') {
        console.error('Invalid title detected for blog with ID:', oldBlog._id)
        continue // Skip this entry and go to the next one
      }

      let blogTitle =
        oldBlog.title && oldBlog.title.trim() !== ''
          ? oldBlog.title
          : 'A Blogz Title should go here...'

      let blogContent =
        oldBlog.url && oldBlog.url.trim() !== ''
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
            comment && comment.trim() !== ''
              ? comment
              : 'This is a sample comment.'
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
    }

    console.log('Migration completed!')
    process.exit(0)
  } catch (error) {
    console.error('Error during migration:', error)
    process.exit(1)
  }
}

migrateData()
