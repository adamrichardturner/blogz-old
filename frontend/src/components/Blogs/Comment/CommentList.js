import React from 'react'
import { Box, List, Divider } from '@mui/material'
import PropTypes from 'prop-types'
import Comment from './Comment'

function CommentsList({ comments, blogId }) {
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  )
  return (
    <List>
      {sortedComments.map((comment, index) => (
        <Box key={comment._id}>
          <Comment
            blogId={blogId}
            authorId={comment.user}
            commentId={comment._id}
            text={comment.content.text}
            date={comment.timestamp}
            giphyUrls={comment.content.giphyUrls}
            likedBy={comment.likedBy}
          />
          <Box paddingLeft={'1rem'} paddingRight={'1rem'}>
            {index !== comments.length - 1 && (
              <Divider
                variant="middle"
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.main',
                  width: '100%',
                  margin: '0 auto',
                }}
              />
            )}
          </Box>
        </Box>
      ))}
    </List>
  )
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default CommentsList
