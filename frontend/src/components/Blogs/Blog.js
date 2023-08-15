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
import GiphySearchModal from '../GiphySearchModal/GiphySearchModal'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import ClearIcon from '@mui/icons-material/Clear'
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog'
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
    isDialogOpen,
    getDialogMessage,
    handleConfirm,
    handleCloseDialog,
  } = useBlogs()
  const { getUserFromId } = useUser()
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState({
    content: {
      text: '',
      giphyUrls: [],
    },
  })

  const handleCommentText = ({ target }) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: {
        ...prevComment.content,
        text: target.value,
      },
    }))
  }

  const handleGifSelect = (selectedGiphyUrl) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: {
        ...prevComment.content,
        giphyUrls: [selectedGiphyUrl],
      },
    }))
  }

  const [commentError, setCommentError] = useState('')

  if (!blog || !user) {
    return null
  }

  // Store all properties of `blog` and `user` in variables to keep the JSX clean.
  const blogId = blog.id || null
  const blogComments = blog.comments || []
  const blogTitle = blog.title || ''
  const blogContentText = blog.content?.text || ''
  const blogContentGiphyUrls = blog.content?.giphyUrls || []
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

    if (!comment.content.text.trim()) {
      setCommentError('You need to write a comment.')
      isValid = false
    }
    if (comment.content.giphyUrls.length > 0) {
      setCommentError('')
      isValid = true
    }

    return isValid
  }

  const submitComment = (event) => {
    event.preventDefault()

    if (!validateComment()) {
      return
    }

    addComment(blog.id, comment)

    return setComment({
      content: {
        text: '',
        giphyUrls: [],
      },
    })
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
    const giphyUrls = comment.content.giphyUrls || []
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
        <Box marginTop={1}>
          {giphyUrls.length > 0 ? (
            <img
              src={giphyUrls[0]}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          ) : null}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: 2,
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
        padding={2}
        variant="outlined"
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
                alignItems: 'flex-start',
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
                  sx={{
                    marginRight: '-5px',
                    marginTop: '-2px',
                  }}
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
              marginBottom: '.5rem',
            }}
          >
            {blogContentText !== null ? blogContentText : ''}
          </Typography>
          <Box>
            {blogContentGiphyUrls.length > 0 ? (
              <img
                src={blogContentGiphyUrls[0]}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            ) : null}
          </Box>
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
            onSubmit={submitComment}
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
              value={comment.content.text}
              onChange={handleCommentText}
              sx={{
                backgroundColor: theme.palette.background.default,
              }}
            />
            <Box marginTop={2} width={'100%'}>
              {comment.content.giphyUrls.length > 0 ? (
                <img
                  src={comment.content.giphyUrls[0]}
                  width={'100%'}
                  height="auto"
                />
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
                insideContent={true}
                theme={theme}
              />
              <Button
                className="insideContent-elements"
                type="submit"
                variant="contained"
                color="primary"
                id="comment"
                onClick={submitComment}
                sx={{
                  marginLeft: 1,
                }}
              >
                Comment
              </Button>
            </Box>
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
      <ConfirmationDialog
        open={isDialogOpen}
        content={getDialogMessage()}
        onConfirm={handleConfirm}
        onClose={handleCloseDialog}
      />
    </Box>
  )
}

export default Blog
