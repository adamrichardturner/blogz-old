import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })

    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <form
      onSubmit={addBlog}
      style={{
        marginTop: 15,
      }}
    >
      <Typography variant="h3" marginBottom={2.75}>
        Create new Blog
      </Typography>

      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          label="Blog Title"
          variant="filled"
          fullWidth
          id="title"
          type="text"
          onChange={({ target }) =>
            setNewBlog((prevState) => ({
              ...prevState,
              title: target.value,
            }))
          }
        />
        <TextField
          label="Blog made by"
          variant="filled"
          fullWidth
          id="author"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) =>
            setNewBlog((prevState) => ({
              ...prevState,
              author: target.value,
            }))
          }
        />
      </Box>
      <Box>
        <TextField
          label="Blog Summary:"
          variant="filled"
          fullWidth
          multiline
          id="url"
          value={newBlog.url}
          name="Url"
          onChange={({ target }) =>
            setNewBlog((prevState) => ({
              ...prevState,
              url: target.value,
            }))
          }
        />
      </Box>
      <Button
        variant="contained"
        id="add-blog"
        type="submit"
        color="primary"
        sx={{
          color: '#fff',
          borderColor: '#fff',
          padding: '16px 16px',
          width: '100%',
          borderRadius: '5px',
        }}
      >
        Create Blog
      </Button>
    </form>
  )
}

export default BlogForm
