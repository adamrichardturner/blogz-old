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
import { useBlogs } from '../../hooks/blogs'
import { useUser } from '../../hooks/users'
import FavoriteIcon from '@mui/icons-material/Favorite'
import formatDate from '../util/formatDate'

const BlogSingle = ({ blog, user, theme }) => {
  const { likeBlog, removeBlog, addComment } = useBlogs()
  const { getUserFromId } = useUser()
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const [comment, setComment] = useState('')

  if (!blog || !user) {
    return null
  }

  // Store all properties of `blog` and `user` in variables to keep the JSX clean.
  const blogId = blog.id || null
  const blogComments = blog.comments || []
  const blogTitle = blog.title || ''
  const blogContentText = blog.content?.text || ''
  const blogLikedBy = blog.likedBy || []
  const blogCreatedAt = blog.createdAt || ''
  const blogUsername = blog.user?.name || ''
  const blogUserId = blog.user?.id || ''

  const userName = user.name || ''
  const userId = user.id || ''

  const addNewLike = () => {
    likeBlog(blogId)
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
      user: userId,
      likedBy: [],
    }
    addComment(blogId, obj)
    return setComment('')
  }

  const displayComments = blogComments.map((comment) => {
    const id = comment._id || null
    const user = comment.user || null
    const text = comment.content.text || null
    const timestamp = comment.timestamp || null
    const [username, name] = getUserFromId(user || null) || []
    return id ? (
      <ListItem key={id}>
        <ListItemText>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="infoText">
              {name}{' '}
              <MuiLink component={RouterLink} to={`/users/${user}`}>
                ({username}){' '}
              </MuiLink>
              · {formatDate(timestamp)}
            </Typography>
          </Box>
          <Typography variant="paragraph">{text}</Typography>
        </ListItemText>
      </ListItem>
    ) : null
  })

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
              <Typography
                variant="h2"
                color="primary"
                marginBottom={0}
                sx={{
                  fontSize: isSmallScreen ? '1.25rem' : '2rem',
                }}
              >
                {blogTitle}
              </Typography>
              {userName === blogUsername ? (
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
            <MuiLink component={RouterLink} to={`/users/${blogUserId}`}>
              {blogUsername}
            </MuiLink>
            {blogCreatedAt !== '2023-08-01T13:00:00.000Z' ? (
              <span> · {formatDate(blogCreatedAt)}</span>
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
            {blogContentText}
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
          {blogComments.length > 0 ? (
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
              <Typography variant="paragraph">{blogLikedBy.length}</Typography>
              <FavoriteIcon
                id="add-like"
                onClick={addNewLike}
                sx={{
                  borderColor: '#fff',
                  fontSize: 26,
                  cursor: 'pointer',
                  paddingLeft: '3px',
                  color: blogLikedBy.includes(userId)
                    ? 'red'
                    : theme.palette.primary.main,
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
