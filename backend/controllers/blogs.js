const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Define route to handle GET requests to /api/blogs, which retrieves all blog data from the MongoDB database
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  // Check if the user field is not set for any blog and add the first user in the database as the user
  const firstUser = await User.findOne()
  blogs.forEach(async (blog) => {
    if (!blog.user && firstUser) {
      blog.user = firstUser
      await blog.save()
    }
  })

  response.status(200).json(blogs)
})

// Define route to handle POST requests to /api/blogs, which adds a new blog to the MongoDB database
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  try {
    const savedBlog = await blog.save()
    await savedBlog.populate('user', { username: 1, name: 1 })

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  // Check that the user ID associated with the token matches the ID of the user who created the blog
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response
      .status(401)
      .json({ error: 'only the creator can delete this blog' })
  }

  // Delete the blog post from the database
  await Blog.findByIdAndRemove(request.params.id)

  // Remove the deleted blog's ID from the user object's blogs array in the database
  const user = await User.findById(decodedToken.id)
  user.blogs = user.blogs.filter(
    (blog) => blog.toString() !== request.params.id.toString()
  )
  await user.save()

  // Send a successful response with a 204 status code and no content
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  try {
    // Find the blog post in the database with the specified id
    const oldBlog = await Blog.findById(request.params.id)

    // Create a blog object with the specified properties
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: (oldBlog.likes || 0) + body.likes,
    }

    // Update the blog post in the database with the specified id and properties
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })

    // Send a successful response with a 200 status code and the updated blog post
    response.status(200).json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const commentText = request.body.text
  const blog = await Blog.findById(request.params.id)
  try {
    blog.comments.push(commentText)
    await blog.save()
    response.status(201).json(blog)
  } catch (error) {
    response.status(500).json({ message: 'Internal server error' })
    next(error)
  }
})

module.exports = blogsRouter
