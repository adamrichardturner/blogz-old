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
  Link as MuiLink,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import { useBlogs } from '../../hooks/blogs'
import { useUser } from '../../hooks/users'
import formatDate from '../util/formatDate'

const Blog = ({ blog, user, theme }) => {
  const { likeBlog, addComment, removeBlog } = useBlogs()
  const { getUserFromId } = useUser()
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState('')

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
    likeBlog(blog.id, updatedBlog)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }

  const handleComment = (event) => {
    event.preventDefault()
    const obj = {
      content: {
        text: comment,
        giphyUrls: [],
      },
      user: user.id,
      likedBy: [],
    }
    addComment(blog.id, obj)
    return setComment('')
  }

  const displayComments = blog.comments.map((comment) => {
    const [username, name] = getUserFromId(comment.user)
    return (
      <ListItem key={comment._id}>
        <ListItemText>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {username && name ? (
              <Typography variant="infoText">
                {name}{' '}
                <MuiLink component={RouterLink} to={`/users/${comment.user}`}>
                  ({username})
                </MuiLink>{' '}
                · {formatDate(comment.timestamp)}
              </Typography>
            ) : null}
          </Box>
          <Typography variant="paragraph">{comment.content.text}</Typography>
        </ListItemText>
      </ListItem>
    )
  })

  if (!blog || !user) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
      }}
      marginTop={2}
      marginBottom={2}
    >
      <Paper
        elevation={2}
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
              {user.name === blog.user.name ? (
                <Button
                  variant="contained"
                  id="remove-blog"
                  onClick={deleteBlog}
                  color="primary"
                  sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    marginTop: '0',
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
            {blog.createdAt !== '2023-08-01T13:00:00.000Z' ? (
              <span> · {formatDate(blog.createdAt)}</span>
            ) : (
              ''
            )}
          </Typography>
          <Typography
            variant="paragraph"
            style={{
              maxWidth: '100%',
              display: 'block',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              marginTop: '1rem',
            }}
          >
            {blog.content.text}
          </Typography>
        </Box>
        <Box
          sx={{
            display: visible ? 'flex' : 'none',
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
          {blog.comments.length > 0 ? (
            <List>
              <Typography variant="h3">Comments</Typography>
              {displayComments}
            </List>
          ) : null}
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
                {visible
                  ? 'Hide'
                  : blog.comments.length > 0 // eslint-disable-next-line indent
                  ? 'View Comments' // eslint-disable-next-line indent
                  : 'Leave Comment'}
              </Typography>
            </a>
          </Box>
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
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                minWidth: '120px',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '2rem',
                }}
              >
                <ChatBubbleOutlineRoundedIcon
                  onClick={toggleDetails}
                  cursor={'pointer'}
                />
                <Typography variant="paragraph" paddingLeft={0.5}>
                  {blog.comments.length > 0 ? blog.comments.length : ''}
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '2rem',
                }}
              >
                {
                  <FavoriteIcon
                    id="add-like"
                    onClick={addNewLike}
                    sx={{
                      borderColor: '#fff',
                      fontSize: 26,
                      cursor: 'pointer',
                      paddingLeft: '3px',
                      color: blog.likedBy.includes(user.id)
                        ? 'red'
                        : theme.palette.primary.main,
                    }}
                  />
                }
                <Typography variant="paragraph" paddingLeft={0.5}>
                  {blog.likedBy ? blog.likedBy.length : ''}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Blog
