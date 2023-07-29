import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useBlogs } from '../hooks'
import Loading from './Loading'
import { Box } from '@mui/material'

const BlogsList = () => {
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

  const list = blogs.map((blog, index) => {
    return (
      <>
        <Blog
          key={blog.id || index}
          blog={blog}
          updateLikes={handleLike}
          removeBlog={handleRemove}
          user={user}
        />
      </>
    )
  })

  const isLoaded = blogs.length > 0

  return isLoaded ? (
    <Box>
      {list}
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
    </Box>
  ) : (
    <Loading />
  )
}

export default BlogsList
