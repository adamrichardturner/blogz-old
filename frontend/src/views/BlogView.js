import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogSingle from '../components/Blogs/BlogSingle'
import { Box } from '@mui/material'
import Loading from '../common/Loading'

const BlogView = () => {
  const id = useParams().id
  const { blogs } = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user.user)
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return (
      <Box
        minHeight={'72vh'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loading mode="large" />
      </Box>
    )
  }

  return (
    <Box marginTop={'110px'} marginBottom={5}>
      <article>
        <BlogSingle blog={blog} user={user} />
      </article>
    </Box>
  )
}

export default BlogView
