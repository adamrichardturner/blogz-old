import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  useMediaQuery,
  Link as MuiLink,
} from '@mui/material'
import readableDate from '../util/readableDate'
import { useBlogs } from '../../hooks/blogs'
import FavoriteIcon from '@mui/icons-material/Favorite'

const BlogSingle = ({ blog, user }) => {
  const { likeBlog, removeBlog, addComment } = useBlogs()
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const [comment, setComment] = useState('')
  const newDate = readableDate()
  console.log(newDate)
  const updatedBlog = {
    user: blog.user,
    likes: 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }

  const addNewLike = () => {
    likeBlog(blog.id, updatedBlog)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }

  const handleComment = (event) => {
    event.preventDefault()
    const obj = {
      id: blog.id,
      text: comment,
      user: user.id,
    }
    addComment(blog.id, obj)
    return setComment('')
  }

  if (!blog || !user) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
      }}
      fullWidth
      marginTop={2}
      marginBottom={2}
    >
      <Paper
        elevation={2}
        fullWidth
        padding={2}
        background="body"
        sx={{
          width: '100%',
        }}
      >
        <Box
          className="blog-details"
          sx={{
            padding: '1rem',
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h2"
                color="primary"
                marginBottom={0}
                sx={{
                  fontSize: isSmallScreen ? '1.25rem' : '2rem',
                }}
              >
                {blog.title}
              </Typography>
              {user.name === blog.user.name ? (
                <Button
                  variant="contained"
                  id="remove-blog"
                  onClick={deleteBlog}
                  color="primary"
                  sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    marginLeft: 1,
                    padding: '5px 5px',
                    fontSize: '.75rem',
                  }}
                >
                  Remove
                </Button>
              ) : null}
            </Box>
          </Box>

          <Typography
            sx={{
              maxWidth: '100%',
              wordWrap: 'break-word',
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
              color: 'body',
              fontStyle: 'italic',
            }}
          >
            Blog made by{' '}
            <MuiLink component={RouterLink} to={`/users/${blog.user.id}`}>
              {blog.user.name}
            </MuiLink>
          </Typography>
          <Typography
            variant="paragraph"
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              maxWidth: '100%',
              display: 'block',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {blog.url}
          </Typography>
        </Box>
        <Box
          sx={{
            flexDirection: 'column',
            padding: 2,
          }}
        >
          <form
            className="commentForm"
            onSubmit={handleComment}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifySelf: 'flex-start',
            }}
          >
            <TextField
              label="Leave a comment"
              variant="filled"
              id="comment"
              fullWidth
              name="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              id="comment"
              onClick={handleComment}
              color="primary"
              sx={{
                color: '#fff',
                borderColor: '#fff',
                padding: '16px 16px',
                width: '100%',
                borderRadius: '5px',
              }}
            >
              Comment
            </Button>
          </form>
          <List>
            <Typography variant="h3">Comments</Typography>
            {blog.comments.map((comment, index) => (
              <Typography variant="paragraph" key={index}>
                <ListItem>
                  <ListItemText>{comment}</ListItemText>
                </ListItem>
              </Typography>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: '1rem',
          }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          ></Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '100%',
            }}
          >
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="paragraph">{blog.likes}</Typography>
              <FavoriteIcon
                id="add-like"
                onClick={addNewLike}
                sx={{
                  borderColor: '#fff',
                  fontSize: 26,
                  cursor: 'pointer',
                  paddingLeft: '3px',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default BlogSingle
