import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Alert,
  TextareaAutosize,
} from '@mui/material'
import GiphySearchModal from '../GiphySearchModal/GiphySearchModal'
import Loading from '../../common/Loading.js'
import ClearIcon from '@mui/icons-material/Clear'

const BlogForm = ({ createBlog, theme, modalRef }) => {
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
        },
      })
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
    let isValid = true
    const newErrors = {}

    if (!newBlog.title.trim()) {
      newErrors.title = 'Title is required'
      isValid = false
    }

    if (!newBlog.content.text.trim()) {
      newErrors.content = 'Content is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
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
              <Box marginTop={2}>
                {newBlog.content.giphyUrls.length > 0 ? (
                  <img src={newBlog.content.giphyUrls[0]} width={'100%'} />
                ) : null}
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
