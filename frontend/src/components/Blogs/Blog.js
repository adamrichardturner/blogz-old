/* eslint-disable indent */
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
import ClearIcon from '@mui/icons-material/Clear'
import { useBlogs } from '../../hooks/blogs'
import { useUser } from '../../hooks/users'
import formatDate from '../util/formatDate'

const Blog = ({ blog, user, theme }) => {
  const {
    likeBlog,
    addComment,
    likeBlogComment,
    removeBlog,
    deleteBlogComment,
  } = useBlogs()
  const { getUserFromId } = useUser()
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState('')

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

  const toggleDetails = () => {
    setVisible(!visible)
  }

  const addNewLike = () => {
    likeBlog(blogId)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }

  const validateComment = () => {
    let isValid = true
    if (!comment.trim()) {
      setCommentError('You need to write a comment.')
      isValid = false
    }
    return isValid
  }

  const handleComment = (event) => {
    event.preventDefault()

    if (!validateComment()) {
      return
    }
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

  const displayComments = blogComments.map((comment) => {
    const addNewCommentLike = () => {
      likeBlogComment(blogId, id)
    }

    const handleDeleteBlogComment = () => {
      deleteBlogComment(blogId, id)
    }

    const id = comment._id || null
    const user = comment.user || null
    const text = comment.content.text || null
    const timestamp = comment.timestamp || null
    const likedBy = comment.likedBy || []
    const [username, name] = getUserFromId(user || null) || []
    return id ? (
      <ListItem
        key={id}
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          flexDirection: 'column',
          padding: '1rem 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="infoText">
              {name}{' '}
              <MuiLink component={RouterLink} to={`/users/${user}`}>
                ({username}){' '}
              </MuiLink>
              · {formatDate(timestamp)}
            </Typography>
          </Box>
          {user === userId ? (
            <ClearIcon
              onClick={handleDeleteBlogComment}
              color="primary"
              cursor="pointer"
            />
          ) : null}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <ListItemText>
            <Typography variant="paragraph">{text}</Typography>
          </ListItemText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <FavoriteIcon
            id="add-like"
            onClick={addNewCommentLike}
            sx={{
              borderColor: '#fff',
              fontSize: 26,
              cursor: 'pointer',
              paddingLeft: '3px',
              color: likedBy.includes(userId)
                ? 'red'
                : theme.palette.primary.main,
            }}
          />
          <Typography variant="paragraph" paddingLeft={0.5}>
            {likedBy ? likedBy.length : ''}
          </Typography>
        </Box>
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
              <MuiLink component={RouterLink} to={`/blogs/${blogId}`}>
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{
                    textDecoration: 'none',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {blogTitle}
                </Typography>
              </MuiLink>
              {userName === blogUsername ? (
                <ClearIcon
                  onClick={deleteBlog}
                  color="primary"
                  cursor="pointer"
                />
              ) : null}
            </Box>
          </Box>

          <Typography
            variant="paragraph"
            fontSize={14}
            sx={{
              maxWidth: '100%',
              wordWrap: 'break-word',
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
              color: 'body',
            }}
          >
            Blog made by{' '}
            {blogUsername !== null ? (
              <MuiLink component={RouterLink} to={`/users/${blogUserId}`}>
                {blogUsername}
              </MuiLink>
            ) : null}
            {blogCreatedAt && blogCreatedAt !== '2023-08-01T13:00:00.000Z' ? (
              <span> · {formatDate(blogCreatedAt)}</span>
            ) : null}
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
            {blogContentText !== null ? blogContentText : ''}
          </Typography>
        </Box>
        <Box
          sx={{
            display: visible ? 'flex' : 'none',
            flexDirection: 'column',
            padding: '1rem',
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
              helperText={commentError}
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
                padding: '6px 16px',
                borderRadius: '5px',
              }}
            >
              Comment
            </Button>
          </form>
          <List>{displayComments}</List>
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
                  : blogComments.length > 0 // eslint-disable-next-line indent
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
                  {blogComments.length > 0 ? blogComments.length : ''}
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
                <Typography variant="paragraph" paddingLeft={0.5}>
                  {blogLikedBy ? blogLikedBy.length : ''}
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
