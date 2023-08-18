import React from 'react'
import { Box, Typography, IconButton, Link as MuiLink } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear'
import { useBlogs } from '../../hooks/blogs'
import { useSelector } from 'react-redux'
import formatDate from '../util/formatDate'
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog'

function BlogHeaderSingle({ blog }) {
  const { title } = blog
  const blogId = blog.id
  const author = blog.user.name
  const authorId = blog.user.id
  const date = blog.createdAt

  const {
    removeBlog,
    isDialogOpen,
    getDialogMessage,
    handleConfirm,
    handleCloseDialog,
  } = useBlogs()

  const userId = useSelector((state) => state.user.user.id)

  const handleScrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="h2"
          color="primary"
          sx={{
            textDecoration: 'none',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {title}
        </Typography>
        {userId === authorId ? (
          <IconButton
            onClick={() => removeBlog(blogId)}
            color="primary"
            cursor="pointer"
            sx={{
              marginRight: '-13px',
              marginTop: '-10px',
            }}
          >
            <ClearIcon />
          </IconButton>
        ) : null}
      </Box>
      <Box>
        <Typography
          variant="paragraph"
          fontSize={14}
          sx={{
            maxWidth: '100%',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            color: 'body',
          }}
        >
          Post made by{' '}
          {author !== null ? (
            <MuiLink
              component={RouterLink}
              to={`/users/${authorId}`}
              onClick={handleScrollToTop}
            >
              {author}
            </MuiLink>
          ) : null}
          {date && date !== '2023-08-01T13:00:00.000Z' ? (
            <span> · {formatDate(date)}</span>
          ) : null}
        </Typography>
      </Box>
      <ConfirmationDialog
        open={isDialogOpen}
        content={getDialogMessage()}
        onConfirm={handleConfirm}
        onClose={handleCloseDialog}
      />
    </Box>
  )
}

export default BlogHeaderSingle
