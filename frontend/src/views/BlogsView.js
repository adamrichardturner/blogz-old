import { useSelector } from 'react-redux'
import { useRef } from 'react'
import Blog from '../components/Blogs/Blog'
import Loading from '../common/Loading'
import { Box, Typography } from '@mui/material'
import Togglable from '../common/Togglable'
import BlogForm from '../components/Blogs/BlogForm'

const BlogsView = () => {
  const { blogs } = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user.user)
  const blogFormRef = useRef()

  if (user === null) {
    return <Loading mode="large" />
  }

  if (blogs.length <= 0) {
    return <Loading mode="large" />
  }

  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  const blogList = sortedBlogs.map((blog) => {
    return <Blog blog={blog} key={blog.id} />
  })

  return (
    <Box>
      <Box>
        <Typography variant="h2" color="body" marginTop={2} marginBottom={0}>
          What&apos;s on your mind, {user.name.split(' ')[0]}? 😄
        </Typography>
      </Box>
      <Box>
        <Togglable buttonLabel="New Post" ref={blogFormRef}>
          <BlogForm modalRef={blogFormRef} />
        </Togglable>
      </Box>
      <Box marginBottom={5}>{blogList}</Box>
    </Box>
  )
}

export default BlogsView
