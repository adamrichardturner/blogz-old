import { Typography, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useTheme } from '@mui/material'
import { useBlogs } from '../../../hooks/blogs'

const CommentFooter = ({ blogId, commentId, likedBy, userId }) => {
  const { likeBlogComment } = useBlogs()
  const theme = useTheme()
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 2,
        }}
      >
        <Typography variant="paragraph" paddingRight={0.5}>
          {likedBy ? likedBy.length : ''}
        </Typography>
        <FavoriteIcon
          id="add-like"
          onClick={() => likeBlogComment(blogId, commentId)}
          sx={{
            borderColor: '#fff',
            fontSize: 26,
            cursor: 'pointer',
            paddingLeft: '3px',
            marginRight: '-3px',
            color: likedBy.includes(userId)
              ? 'red'
              : theme.palette.primary.main,
          }}
        />
      </Box>
    </>
  )
}

export default CommentFooter
