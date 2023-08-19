import { Box, Paper } from '@mui/material'
import BlogHeaderSingle from './BlogHeaderSingle'
import BlogContentSingle from './BlogContentSingle'
import CommentForm from './Comment/CommentForm'
import CommentsList from './Comment/CommentList'

const BlogSingle = ({ blog, user }) => {
  if (!blog || !user) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
      }}
      marginTop={2}
      marginBottom={2}
    >
      <Paper
        padding={2}
        variant="outlined"
        sx={{
          width: '100%',
        }}
      >
        <BlogHeaderSingle blog={blog} />
        <BlogContentSingle
          content={blog.content.text}
          gif={blog.content.giphyUrls[0]}
          blogId={blog.id}
          likedBy={blog.likedBy}
          commentCount={blog.comments.length}
        />
        <CommentForm blogId={blog.id} />
        <CommentsList comments={blog.comments} blogId={blog.id} />
      </Paper>
    </Box>
  )
}

export default BlogSingle
