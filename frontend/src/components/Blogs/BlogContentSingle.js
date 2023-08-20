import React, { useState } from 'react'
import { Box, Typography, Dialog, DialogContent } from '@mui/material'
import BlogFooterSingle from './BlogFooterSingle'

function BlogContent({ blogId, likedBy, commentCount, content, gif }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // For the GIF preview
  const gifPreviewStyle = {
    cursor: 'pointer',
    marginTop: '.5rem',
    width: '100%',
    maxHeight: '420px',
    objectFit: 'cover',
  }

  // For the GIF in the modal
  const gifModalStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '70vh',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  return (
    <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
      <Typography
        variant="body1"
        paragraph
        marginBottom={0}
        sx={{
          wordWrap: 'break-word',
        }}
      >
        {content}
      </Typography>
      {gif && (
        <>
          <img
            src={gif}
            alt="Blog GIF"
            onClick={handleClickOpen}
            style={gifPreviewStyle}
          />
          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogContent>
              <img src={gif} alt="Blog GIF in Modal" style={gifModalStyle} />
            </DialogContent>
          </Dialog>
        </>
      )}
      <BlogFooterSingle
        blogId={blogId}
        likedBy={likedBy}
        commentCount={commentCount}
      />
    </Box>
  )
}

export default BlogContent
