import { useState } from 'react'
import { useBlogs } from '../hooks'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const BlogFooter = ({ blog, user }) => {
  const { id } = blog
  const [comment, setComment] = useState('')
  const { likeBlog, addComment, removeBlog } = useBlogs()

  const handleLike = async () => {
    await likeBlog(id, blog)
  }

  const handleDelete = () => {
    removeBlog(blog)
  }

  const handleComment = (event) => {
    event.preventDefault()
    const obj = {
      id,
      text: comment,
    }
    addComment(id, obj)
    return setComment('')
  }
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="paragraph">{blog.likes}</Typography>
          <FavoriteIcon
            id="add-like"
            onClick={handleLike}
            color="danger"
            sx={{
              borderColor: '#fff',
              fontSize: 26,
              cursor: 'pointer',
              paddingLeft: '3px',
            }}
          />
        </div>
        <div>
          {user.name === blog.user.name ? (
            <Button
              variant="contained"
              id="remove-blog"
              onClick={handleDelete}
              color="danger"
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
        </div>
      </div>
      <div
        style={{
          marginTop: '2rem',
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
        <List
          sx={{
            paddingTop: '2rem',
          }}
        >
          {blog.comments.map((comment, index) => (
            <Typography variant="paragraph" key={index}>
              <ListItem>
                <ListItemText>{comment}</ListItemText>
              </ListItem>
            </Typography>
          ))}
        </List>
      </div>
    </div>
  )
}

export default BlogFooter
