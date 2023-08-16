import React, { useState } from 'react'
import { Box, Typography, Dialog, DialogContent } from '@mui/material'
import PropTypes from 'prop-types'
import BlogFooter from './BlogFooter'

function BlogContent({ blogId, likedBy, commentCount, content, gif }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
      <Typography variant="body1" paragraph marginBottom={0}>
        {content}
      </Typography>
      {gif && (
        <>
          <img
            src={gif}
            alt="Blog GIF"
            onClick={handleClickOpen}
            style={{
              cursor: 'pointer',
              marginTop: '.5rem',
              maxHeight: '400px',
              width: '100%',
              objectFit: 'cover',
            }}
          />
          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogContent>
              <img
                src={gif}
                alt="Blog GIF in Modal"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
      <BlogFooter
        blogId={blogId}
        likedBy={likedBy}
        commentCount={commentCount}
      />
    </Box>
  )
}

BlogContent.propTypes = {
  content: PropTypes.string.isRequired,
}

export default BlogContent
