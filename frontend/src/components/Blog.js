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
          <span
            style={{
              fontSize: '1.75rem',
              lineHeight: '1.95rem',
              textDecoration: 'none',
            }}
          >
            {blog.title}
          </span>
        </MuiLink>
        <Typography variant="paragraphHeader">
          <p>Blog made by {blog.author}</p>
        </Typography>
        <Typography variant="paragraph">
          <p
            style={{
              margin: '1rem 0',
            }}
          >
            {blog.url}
          </p>
        </Typography>
        <Typography variant="paragraph">User: </Typography>
        <MuiLink component={RouterLink} to={`/users/${blog.user.id}`}>
          {blog.user.name}
        </MuiLink>
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
          padding: 5,
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
                color="primary"
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  marginLeft: 1,
                  padding: '6px 10px',
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
