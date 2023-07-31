import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleDetails = () => {
    setVisible(!visible)
  }

  const updatedBlog = {
    user: blog.user,
    likes: 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }

  const addNewLike = () => {
    updateLikes(blog.id, updatedBlog)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }

  if (!blog || !user) {
    return null
  }

  return (
    <Box
      border={1}
      borderColor="text.primary"
      p={2}
      marginTop={2}
      borderRadius={2}
    >
      <Box className="blog-details">
        <MuiLink component={RouterLink} to={`/blogs/${blog.id}`}>
          <Typography
            variant="h3"
            color="primary"
            sx={{
              textDecoration: 'none',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {blog.title}
          </Typography>
        </MuiLink>
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
          display: visible ? 'flex' : 'none',
          flexDirection: 'column',
        }}
      >
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
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a
            onClick={toggleDetails}
            style={{
              fontSize: 14,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="paragraph"
              sx={{
                textDecoration: 'underline',
              }}
            >
              {blog.comments.length > 0
                ? visible
                  ? 'Hide'
                  : 'View Comments'
                : null}
            </Typography>
          </a>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
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
              color="danger"
              sx={{
                borderColor: '#fff',
                fontSize: 26,
                cursor: 'pointer',
                paddingLeft: '3px',
              }}
            />
          </Box>
          <Box>
            {user.name === blog.user.name ? (
              <Button
                variant="contained"
                id="remove-blog"
                onClick={deleteBlog}
                color="warning"
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
      </Box>
    </Box>
  )
}

export default Blog
