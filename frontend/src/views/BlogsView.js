import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from '../common/Togglable'
import BlogForm from '../components/Blogs/BlogForm'
import Blog from '../components/Blogs/Blog'
import { useBlogs } from '../hooks'
import Loading from '../common/Loading'
import { Box, Typography } from '@mui/material'

const BlogsView = () => {
  const { blogs } = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user.user)
  const { removeBlog, likeBlog, createBlog } = useBlogs()
  const blogFormRef = useRef()

  const handleLike = async (id, updatedBlog) => {
    await likeBlog(id, updatedBlog)
  }

  const handleRemove = async (blogToRemove) => {
    await removeBlog(blogToRemove)
  }

  const handleCreateBlog = (blogData) => {
    blogFormRef.current.toggleVisibility()
    createBlog(blogData)
  }

  if (blogs.length <= 0) {
    return <Loading mode="large" />
  }

  const list = blogs.map((blog, index) => {
    return (
      <Blog
        key={blog.id || index}
        blog={blog}
        updateLikes={handleLike}
        removeBlog={handleRemove}
        user={user}
      />
    )
  })

  return (
    <Box>
      <Typography variant="h2" color="body">
        Welcome to Blogz! Spill the beans, we won&apos;t judge! 😄
      </Typography>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      {list}
    </Box>
  )
}

export default BlogsView
