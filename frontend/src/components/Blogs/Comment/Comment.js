import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  ListItem,
  ListItemText,
  Box,
  Typography,
  Dialog,
  DialogContent,
  Link as MuiLink,
} from '@mui/material'
import { useBlogs } from '../../../hooks/blogs'
import { useUser } from '../../../hooks/users'
import formatDate from '../../util/formatDate'
import ClearIcon from '@mui/icons-material/Clear'
import { useSelector } from 'react-redux'
import CommentFooter from './CommentFooter'
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog'

function Comment({
  blogId,
  authorId,
  commentId,
  text,
  date,
  giphyUrls,
  likedBy,
}) {
  const { getUserFromId } = useUser()
  const {
    deleteBlogComment,
    isDialogOpen,
    getDialogMessage,
    handleConfirm,
    handleCloseDialog,
  } = useBlogs()
  const name = getUserFromId(authorId || null) || []
  const userId = useSelector((state) => state.user.user.id)
  const gif = giphyUrls || null
  const liked = likedBy || []

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ListItem
      key={commentId}
      padding={1}
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'column',
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
            <MuiLink component={RouterLink} to={`/users/${authorId}`}>
              {name}{' '}
            </MuiLink>
            · {formatDate(date)}
          </Typography>
        </Box>
        {authorId === userId ? (
          <ClearIcon
            onClick={() => deleteBlogComment(blogId, commentId)}
            color="primary"
            cursor="pointer"
            sx={{
              marginRight: '-5px',
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
        {gif[0] && (
          <>
            <img
              src={gif[0]}
              alt="Gif Comment"
              onClick={handleClickOpen}
              style={{
                cursor: 'pointer',
                marginTop: '.5rem',
                maxHeight: '400px',
                width: '100%',
                objectFit: 'cover',
              }}
            />
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <DialogContent>
                <img
                  src={gif[0]}
                  alt="Gif Comment in Modal"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />
              </DialogContent>
            </Dialog>
          </>
        )}
      </Box>
      <CommentFooter
        blogId={blogId}
        commentId={commentId}
        likedBy={liked}
        userId={userId}
      />
      <ConfirmationDialog
        open={isDialogOpen}
        content={getDialogMessage()}
        onConfirm={handleConfirm}
        onClose={handleCloseDialog}
      />
    </ListItem>
  )
}

export default Comment
