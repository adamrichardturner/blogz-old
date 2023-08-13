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
import ClearIcon from '@mui/icons-material/Clear'
import formatDate from '../util/formatDate'
import { useNavigate } from 'react-router-dom'

const BlogSingle = ({ blog, user, theme }) => {
  const navigate = useNavigate()
  const {
    likeBlog,
    removeBlog,
    addComment,
    likeBlogComment,
    deleteBlogComment,
  } = useBlogs()
  const { getUserFromId } = useUser()
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))
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

  const addNewLike = () => {
    likeBlog(blogId)
  }

  const deleteBlog = () => {
    navigate('/')
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
            alignItems: 'flex-start',
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
              sx={{
                marginRight: '-5px',
                marginTop: '-2px',
              }}
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
        variant="outlined"
        padding={2}
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
                lineHeight={1}
                sx={{
                  fontSize: isSmallScreen ? '1.25rem' : '2rem',
                }}
              >
                {blogTitle}
              </Typography>
              {userName === blogUsername ? (
                <ClearIcon onClick={deleteBlog} cursor="pointer" />
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
              helperText={commentError}
              fullWidth
              name="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              sx={{
                backgroundColor: theme.palette.background.default,
              }}
            />
            <Button
              className="insideContent-elements"
              type="submit"
              variant="contained"
              id="comment"
              onClick={handleComment}
            >
              Comment
            </Button>
          </form>
          {blogComments.length > 0 ? <List>{displayComments}</List> : null}
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
              <Typography variant="paragraph" paddingLeft={'4px'}>
                {blogLikedBy.length}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default BlogSingle
