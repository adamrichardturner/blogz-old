const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Define route to handle GET requests to /api/blogs/, which retrieves all blog data from the MongoDB database
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    content: {
      text: body.content.text,
      giphyUrls: [],
    },
    likedBy: body.likes ? Array(body.likes).fill(user._id) : [],
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

    // Validate if the user liking the blog is already in the likedBy array
    // Note: This assumes body.likes is now an array of user IDs liking the blog
    const combinedLikes = [
      ...new Set([...(oldBlog.likedBy || []), ...body.likes]),
    ]

    // Create a blog object with the specified properties
    const blog = {
      title: body.title,
      content: {
        text: body.content.text,
        giphyUrls: body.content.giphyUrls || [],
      },
      likedBy: combinedLikes,
      // Add other fields if you have them in your request.body
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

blogsRouter.post('/:id/like', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).send({ error: 'Blog not found' })
    }

    const userId = req.user._id // Assuming you have some authentication and store user in `req.user`

    // Toggle the user ID in the `likedBy` array
    if (blog.likedBy.includes(userId)) {
      blog.likedBy = blog.likedBy.filter(
        (uid) => uid.toString() !== userId.toString()
      )
    } else {
      blog.likedBy.push(userId)
    }

    await blog.save()
    res.status(200).send(blog)
  } catch (error) {
    console.error('Error toggling like on the blog:', error)
    res.status(500).send({ error: 'Internal server error' })
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  console.log(request.body)
  const text = request.body.content.text
  const giphyUrls = request.body.content.giphyUrls
  const user = request.user

  // Create the comment object based on your new schema
  const newComment = {
    content: {
      text: text,
      giphyUrls: giphyUrls || [], // default to empty array if not provided
    },
    user: user._id,
    likedBy: [], // Assuming initially no one liked the comment
  }

  try {
    const blog = await Blog.findById(request.params.id)

    blog.comments.push(newComment) // Push the new comment object
    await blog.save()

    response.status(201).json(blog)
  } catch (error) {
    response.status(500).json({ message: 'Internal server error' })
    next(error)
  }
})

module.exports = blogsRouter
