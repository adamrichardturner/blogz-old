import React from 'react'
import { Box, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import { useBlogs } from '../../hooks/blogs'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material'

function BlogFooter({ blogId, likedBy, commentCount }) {
  const userId = useSelector((state) => state.user.user.id)

  const { handleToggleComments, likeBlog } = useBlogs()
  const theme = useTheme()

  return (
    <Box paddingTop={'.5rem'}>
      <Box
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          minWidth: '120px',
        }}
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '2rem',
          }}
        >
          <Typography variant="paragraph" paddingRight={0.5}>
            {commentCount || null}
          </Typography>
          <ChatBubbleOutlineRoundedIcon
            onClick={() => handleToggleComments(blogId)}
            cursor={'pointer'}
          />
        </Box>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '2rem',
          }}
        >
          <Typography variant="paragraph" paddingLeft={0.5}>
            {likedBy.length && likedBy.length}
          </Typography>
          <FavoriteIcon
            id="add-like"
            onClick={() => likeBlog(blogId)}
            sx={{
              borderColor: '#fff',
              fontSize: 26,
              cursor: 'pointer',
              paddingLeft: '3px',
              color: likedBy.includes(userId)
                ? 'red'
                : theme.palette.primary.main,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default BlogFooter
