import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogFooter from './BlogFooter'
import { Box, Typography } from '@mui/material'
import Loading from './Loading'

const BlogView = () => {
  const id = useParams().id
  const { blogs } = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user.user)
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return <Loading />
  }

  return (
    <Box>
      <article>
        <Box className="blog__meta">
          <Typography
            variant="h2"
            lineHeight={1}
            marginTop={2}
            marginBottom={2}
            color="primary"
          >
            {blog.title}
          </Typography>
        </Box>
        <Box className="blog__content">
          <Typography variant="paragraph">
            <p>{blog.url}</p>
          </Typography>
        </Box>
        <BlogFooter blog={blog} user={user} />
      </article>
    </Box>
  )
}

export default BlogView
