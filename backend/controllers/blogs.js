const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Get all blogs from the database
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

// Add a new blog
blogsRouter.post('/', async (request, response, next) => {
  try {
    if (!request.token || !request.user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    // Check if title
    if (!request.body.title || !request.body.content.giphyUrls) {
      return response.status(400).json({ error: 'Title or GIF required' })
    }

    const newBlog = {
      title: request.body.title,
      content: {
        text: request.body.content.text || '',
        giphyUrls: request.body.content.giphyUrls || [],
      },
    }

    const blog = new Blog({ ...newBlog, user: request.user._id })

    const savedBlog = await blog.save()

    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

// Delete a blog
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    if (
      !request.decodedToken ||
      blog.user.toString() !== request.decodedToken.id.toString()
    ) {
      return response
        .status(403)
        .json({ error: 'Only the creator can delete this blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    const user = await User.findById(request.decodedToken.id)
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id.toString()
    )
    await user.save()

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// Update a blog
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  try {
    const oldBlog = await Blog.findById(request.params.id)

    if (!oldBlog) {
      return response.status(404).json({ error: 'Not Found' })
    }
    const combinedLikes = [
      ...new Set([...(oldBlog.likedBy || []), ...body.likedBy]),
    ]

    const blog = {
      title: body.title,
      content: {
        text: body.content.text,
        giphyUrls: body.content.giphyUrls || [],
      },
      likedBy: combinedLikes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })

    response.status(200).json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

// Toggle adding userId to likes of a blog
blogsRouter.post('/:id/like', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      response.status(404).send({ error: 'Blog not found' })
    }

    const userId = request.user._id

    if (blog.likedBy.includes(userId)) {
      blog.likedBy = blog.likedBy.filter(
        (uid) => uid.toString() !== userId.toString()
      )
    } else {
      blog.likedBy.push(userId)
    }

    await blog.save()
    response.status(200).send(blog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post(
  '/:blogId/comments/:commentId/like',
  async (request, response, next) => {
    try {
      const { blogId, commentId } = request.params

      const blog = await Blog.findById(blogId)

      if (!blog) {
        return response.status(404).send({ error: 'Blog not found' })
      }

      const comment = blog.comments.id(commentId)

      if (!comment) {
        return response.status(404).send({ error: 'Comment not found' })
      }

      const userId = request.user._id

      // Convert ObjectId to string for the comparison
      const stringifiedLikedBy = comment.likedBy.map((id) => id.toString())

      // Toggle the user ID in the `likedBy` array for the comment
      if (stringifiedLikedBy.includes(userId.toString())) {
        comment.likedBy = comment.likedBy.filter(
          (uid) => uid.toString() !== userId.toString()
        )
      } else {
        comment.likedBy.push(userId)
      }

      await blog.save()
      response.status(200).send(blog)
    } catch (error) {
      next(error)
    }
  }
)

// Delete a blog
blogsRouter.delete(
  '/:blogId/comments/:commentId/delete',
  async (request, response, next) => {
    try {
      const { blogId, commentId } = request.params

      const blog = await Blog.findById(blogId)

      if (!blog) {
        return response.status(404).send({ error: 'Blog not found' })
      }

      const comment = blog.comments.id(commentId)

      if (!comment) {
        return response.status(404).send({ error: 'Comment not found' })
      }

      const decodedToken = jwt.verify(request.token, process.env.SECRET)

      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }

      // Check that the user ID associated with the token matches the ID of the user who created the comment
      if (comment.user.toString() !== decodedToken.id.toString()) {
        return response
          .status(401)
          .json({ error: 'Only the creator can delete this comment' })
      }

      // Delete the comment
      blog.comments = blog.comments.filter((comment) => {
        comment._id.toString() !== commentId
      })

      // Save the updated blog post
      await blog.save()

      response.status(200).send({ message: 'Comment deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
)

// Comment on a blog
blogsRouter.post('/:id/comments', async (request, response, next) => {
  if (!request.user) {
    return response.status(401).json({ message: 'User not authenticated' })
  }

  const text = request.body.content.text
  const giphyUrls = request.body.content.giphyUrls
  const user = request.user

  if (text.length === 0 && giphyUrls.length === 0) {
    return response
      .status(404)
      .json({ message: 'Text or GIF required to comment.' })
  }

  const newComment = {
    content: {
      text: text || '',
      giphyUrls: giphyUrls || [],
    },
    user: user._id,
    likedBy: [],
  }

  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ message: 'Blog not found' })
    }
    blog.comments.push(newComment)
    blog.updatedAt = Date.now()
    await blog.save()
    response.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
