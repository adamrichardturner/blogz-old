import React, { useState } from 'react'
import { Dialog, DialogContent, Button, TextField, Box } from '@mui/material'
import PropTypes from 'prop-types'
import { useBlogs } from '../../../hooks/blogs'
import { useTheme } from '@mui/material/styles'
import GiphySearchModal from '../../GiphySearchModal/GiphySearchModal'

function CommentForm({ blogId }) {
  const { addComment, handleToggleComments } = useBlogs()
  const theme = useTheme()

  const [comment, setComment] = useState({
    content: {
      text: '',
      giphyUrls: [],
    },
  })

  const [commentError, setCommentError] = useState('')

  const handleCommentText = ({ target }) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: {
        ...prevComment.content,
        text: target.value,
      },
    }))
  }

  const handleGifSelect = (selectedGiphyUrl) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: {
        ...prevComment.content,
        giphyUrls: [selectedGiphyUrl],
      },
    }))
  }

  const validateComment = () => {
    let isValid = true

    if (!comment.content.text.trim()) {
      setCommentError('You need to write a comment.')
      isValid = false
    }
    if (comment.content.giphyUrls.length > 0) {
      setCommentError('')
      isValid = true
    }

    return isValid
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (!validateComment()) {
      return
    }

    addComment(blogId, comment)
    handleToggleComments(blogId)

    return setComment({
      content: {
        text: '',
        giphyUrls: [],
      },
    })
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      padding={'0rem 1rem 1rem 1rem'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box marginTop={1}>
        {comment.content.giphyUrls.length > 0 && (
          <>
            <img
              src={comment.content.giphyUrls[0]}
              alt="Gif Comment"
              onClick={handleClickOpen}
              style={{
                cursor: 'pointer',
                marginTop: '.5rem',
                maxHeight: '300px',
                width: '100%',
                objectFit: 'cover',
              }}
            />
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <DialogContent>
                <img
                  src={comment.content.giphyUrls[0]}
                  alt="Gif Comment in Modal"
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
      </Box>
      <TextField
        label="Leave a comment"
        variant="filled"
        id="comment"
        helperText={commentError}
        name="comment"
        fullWidth
        value={comment.content.text}
        onChange={handleCommentText}
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <GiphySearchModal
          onGifSelect={(selectedUrl) => handleGifSelect(selectedUrl)}
          insideContent={true}
          theme={theme}
        />
        <Button
          className="insideContent-elements"
          type="submit"
          variant="contained"
          color="primary"
          id="comment"
          sx={{
            marginLeft: 1,
          }}
        >
          Comment
        </Button>
      </Box>
    </Box>
  )
}

CommentForm.propTypes = {
  blogId: PropTypes.string.isRequired,
}

export default CommentForm
