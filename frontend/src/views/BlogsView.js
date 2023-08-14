import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from '../common/Togglable'
import BlogForm from '../components/Blogs/BlogForm'
import Blog from '../components/Blogs/Blog'
import { useBlogs } from '../hooks/blogs'
import Loading from '../common/Loading'
import { Box, Typography } from '@mui/material'

const BlogsView = ({ theme }) => {
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

  if (user === null) {
    return <Loading mode="large" />
  }

  if (blogs.length <= 0) {
    return <Loading mode="large" />
  }

  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  const list = sortedBlogs.map((blog, index) => {
    return (
      <Blog
        key={blog.id || index}
        blog={blog}
        updateLikes={handleLike}
        removeBlog={handleRemove}
        user={user}
        theme={theme}
      />
    )
  })

  return (
    <Box>
      <Box>
        <Typography variant="h2" color="body" marginTop={2} marginBottom={0}>
          What&apos;s on your mind, {user.name.split(' ')[0]}? 😄
        </Typography>
      </Box>
      <Box>
        <Togglable buttonLabel="New Blog" ref={blogFormRef} theme={theme}>
          <BlogForm
            createBlog={handleCreateBlog}
            theme={theme}
            modalRef={blogFormRef}
          />
        </Togglable>
      </Box>
      {list}
    </Box>
  )
}

export default BlogsView
