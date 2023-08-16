import { useSelector } from 'react-redux'
import { Box, Paper } from '@mui/material'
import BlogHeader from './BlogHeader'
import BlogContent from './BlogContent'
import CommentsList from './Comment/CommentList'
import CommentForm from './Comment/CommentForm'

const Blog = ({ blog }) => {
  const commentsVisible = useSelector(
    (state) => state.blogs.commentsVisibility[blog.id] || false
  )

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
        <BlogHeader
          title={blog.title}
          blogId={blog.id}
          author={blog.user.name}
          authorId={blog.user.id}
          date={blog.createdAt}
        />
        <BlogContent
          content={blog.content.text}
          gif={blog.content.giphyUrls[0]}
          blogId={blog.id}
          likedBy={blog.likedBy}
          commentCount={blog.comments.length}
        />
        <CommentForm blogId={blog.id} />
        {commentsVisible && (
          <CommentsList comments={blog.comments} blogId={blog.id} />
        )}
      </Paper>
    </Box>
  )
}

export default Blog
