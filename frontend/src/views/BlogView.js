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
    return <Loading mode="large" />
  }

  return (
    <Box marginTop={'16px'} marginBottom={5}>
      <article>
        <BlogSingle blog={blog} user={user} />
      </article>
    </Box>
  )
}

export default BlogView
