import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogSingle from '../components/Blogs/BlogSingle'
import { Box } from '@mui/material'
import Loading from '../common/Loading'
import { useBlogs } from '../hooks/blogs'

const BlogView = ({ theme }) => {
  const id = useParams().id
  const { blogs } = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user.user)
  const blog = blogs.find((b) => b.id === id)
  const { removeBlog, likeBlog } = useBlogs()

  const handleLike = async (id, updatedBlog) => {
    await likeBlog(id, updatedBlog)
  }

  const handleRemove = async (blogToRemove) => {
    await removeBlog(blogToRemove)
  }

  if (!blog) {
    return <Loading mode="large" />
  }

  return (
    <Box marginTop={'16px'}>
      <article>
        <BlogSingle
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleRemove={handleRemove}
          theme={theme}
        />
      </article>
    </Box>
  )
}

export default BlogView
