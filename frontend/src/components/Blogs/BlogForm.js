import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Alert,
  TextareaAutosize,
  Dialog,
  DialogContent,
} from '@mui/material'
import { useBlogs } from '../../hooks/blogs'
import GiphySearchModal from '../GiphySearchModal/GiphySearchModal'
import Loading from '../../common/Loading.js'
import ClearIcon from '@mui/icons-material/Clear'
import { useTheme } from '@mui/material/styles'

const BlogForm = ({ modalRef }) => {
  const theme = useTheme()
  const { createBlog } = useBlogs()
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: {
      text: '',
      giphyUrls: [],
    },
  })

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    form: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleTitleChange = ({ target }) => {
    setNewBlog((prevState) => ({
      ...prevState,
      title: target.value,
    }))
  }

  const handleContentChange = ({ target }) => {
    setNewBlog((prevState) => ({
      ...prevState,
      content: {
        ...prevState.content,
        text: target.value,
      },
    }))
  }

  const handleGifSelect = (selectedGiphyUrl) => {
    setNewBlog((prevState) => ({
      ...prevState,
      content: {
        ...prevState.content,
        giphyUrls: [selectedGiphyUrl],
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await createBlog(newBlog)
      setNewBlog({
        title: '',
        content: {
          text: '',
          giphyUrls: [],
        },
      })
      modalRef.current.toggleVisibility()
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: 'Error creating blog. Please try again.',
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!newBlog.title.trim()) {
      newErrors.title = 'Title is required'
      setErrors(newErrors)
      return false
    }

    if (!newBlog.content.giphyUrls && !newBlog.content.text.trim()) {
      newErrors.content = 'Content or GIF required'
      setErrors(newErrors)
      return false
    }

    return true
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
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}
      >
        <ClearIcon
          onClick={() => modalRef.current.toggleVisibility()}
          cursor={'pointer'}
          sx={{
            marginRight: '-5px',
            marginTop: '-2px',
          }}
        />
      </Box>

      <Box>
        <Typography
          variant="h2"
          paddingBottom={'.75rem'}
          marginTop={'0 !important'}
          fontSize={'1.25rem'}
          textAlign={'center'}
        >
          Create a Blog
        </Typography>
        {errors.form && <Alert severity="error">{errors.form}</Alert>}
        <Box
          width="100%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          {!isLoading ? (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <FormControl fullWidth>
                <TextField
                  label="Blog Title"
                  variant="outlined"
                  fontSize={'1rem'}
                  fullWidth
                  id="title"
                  type="text"
                  value={newBlog.title}
                  onChange={handleTitleChange}
                  helperText={errors.title}
                  inputProps={{ maxLength: 120 }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextareaAutosize
                  id="content"
                  minRows={2}
                  maxRows={8}
                  value={newBlog.content.text}
                  onChange={handleContentChange}
                  maxLength={4000}
                  className="globalTextareaStyle"
                  placeholder="What's on your mind?"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    width: '100%',
                    marginTop: '1rem',
                    resize: 'none',
                    color: theme.palette.primary.main,
                  }}
                />
                {errors.content && (
                  <div
                    style={{
                      marginTop: '0',
                      position: 'absolute',
                      top: '20px',
                      right: 0,
                      marginRight: '13px',
                      color: theme.palette.primary.main,
                      opacity: 0.85,
                      fontSize: '.65rem',
                    }}
                  >
                    {errors.content}
                  </div>
                )}
              </FormControl>
              <Box marginTop={1}>
                {newBlog.content.giphyUrls[0] && (
                  <>
                    <img
                      src={newBlog.content.giphyUrls[0]}
                      alt="Gif Comment"
                      onClick={handleClickOpen}
                      style={{
                        cursor: 'pointer',
                        marginTop: '.5rem',
                        maxHeight: '400px',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      maxWidth="md"
                      fullWidth
                    >
                      <DialogContent>
                        <img
                          src={newBlog.content.giphyUrls[0]}
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <GiphySearchModal
                  onGifSelect={(selectedUrl) => handleGifSelect(selectedUrl)}
                  theme={theme}
                  btnColor={theme.palette.paper.main}
                />
                <Button
                  variant="contained"
                  id="add-blog"
                  type="submit"
                  color="primary"
                  sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    padding: '6px 16px',
                    borderRadius: '5px',
                    marginLeft: 1,
                  }}
                >
                  Create Blog
                </Button>
              </Box>
            </form>
          ) : (
            <Loading mode="small" />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default BlogForm
