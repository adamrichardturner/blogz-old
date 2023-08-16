import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = {
  blogs: [],
  userLikedBlogs: [],
  userLikedComments: [],
  commentsVisibility: {},
}

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.blogs.push(action.payload)
    },

    setBlogs(state, action) {
      state.blogs = action.payload
    },

    likeBlog(state, action) {
      const id = action.payload.id
      const userId = action.payload.userId
      const blogToLike = state.blogs.find((b) => b.id === id)

      if (blogToLike) {
        if (blogToLike.likedBy.includes(userId)) {
          blogToLike.likedBy = blogToLike.likedBy.filter(
            (uid) => uid !== userId
          )
          state.userLikedBlogs = state.userLikedBlogs.filter(
            (blogId) => blogId !== id
          )
        } else {
          blogToLike.likedBy.push(userId)
          state.userLikedBlogs.push(id)
        }
      }
    },

    likeBlogComment(state, action) {
      const { blogId, commentId, userId } = action.payload
      const blog = state.blogs.find((b) => b.id === blogId)
      if (blog) {
        const comment = blog.comments.find((c) => c._id === commentId)
        if (comment) {
          if (comment.likedBy.includes(userId)) {
            comment.likedBy = comment.likedBy.filter((uid) => uid !== userId)
            // Remove the comment's unique identifier from userLikedComments
            state.userLikedComments = state.userLikedComments.filter(
              (likedCommentId) => likedCommentId !== `${blogId}-${commentId}`
            )
          } else {
            comment.likedBy.push(userId)
            // Add the comment's unique identifier to userLikedComments
            state.userLikedComments.push(`${blogId}-${commentId}`)
          }
        }
      }
    },

    deleteBlog(state, action) {
      // Reducer for deleting a blog
      const id = action.payload.id // Extract the ID of the blog to be deleted from the payload
      state.blogs = state.blogs.filter((b) => b.id !== id) // Return a new array without the deleted blog
    },

    appendComment(state, action) {
      const { id, comment } = action.payload
      const blogToComment = state.blogs.find((b) => b.id === id)

      const updatedBlog = {
        ...blogToComment,
        comments: [...blogToComment.comments, comment],
      }

      // Replace the blogToComment in the state.blogs array with the updatedBlog
      state.blogs = state.blogs.map((b) => (b.id === id ? updatedBlog : b))
    },

    deleteComment(state, action) {
      const { blogId, commentId } = action.payload
      const blog = state.blogs.find((b) => b.id === blogId)
      if (blog) {
        blog.comments = blog.comments.filter(
          (c) => c._id.toString() !== commentId
        )
      }
    },

    toggleCommentsVisibility(state, action) {
      const blogId = action.payload
      state.commentsVisibility[blogId] = !state.commentsVisibility[blogId]
    },
  },
})

export const {
  appendBlog,
  setBlogs,
  likeBlog,
  deleteBlog,
  appendComment,
  likeBlogComment,
  deleteComment,
  toggleCommentsVisibility,
} = blogsSlice.actions // Exporting the reducer functions as named exports

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll() // Fetching all blogs from the blog service module
    await dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = (blogData) => async (dispatch) => {
  try {
    await blogService.create(blogData)
    await dispatch(initializeBlogs())
  } catch (error) {
    console.error(error)
  }
}

export const likeSelectedBlog = (id) => async (dispatch, getState) => {
  try {
    const userId = getState().user.user.id

    // Toggle like/unlike immediately for UI feedback
    dispatch(likeBlog({ id, userId }))

    // Send the request to the backend to persistently store the like/unlike
    await blogService.toggleLike(id)

    // If needed, update the Redux state with the data returned from the backend
  } catch (error) {
    console.error(error)
  }
}

export const likeSelectedBlogComment =
  (blogId, commentId) => async (dispatch, getState) => {
    try {
      const userId = getState().user.user.id
      // Toggle like/unlike immediately for UI feedback
      dispatch(likeBlogComment({ blogId, commentId, userId }))

      // Send the request to the backend to persistently store the like/unlike
      await blogService.toggleCommentLike(blogId, commentId)

      // If needed, update the Redux state with the data returned from the backend
    } catch (error) {
      console.error(error)
    }
  }

export const deleteSelectedBlog = (blogId) => async (dispatch) => {
  try {
    await blogService.deleteBlog(blogId)
    await dispatch(deleteBlog(blogId))
    await dispatch(initializeBlogs())
  } catch (error) {
    console.error(error)
  }
}

export const commentSelectedBlog = (id, obj) => async (dispatch) => {
  try {
    await blogService.commentBlog(id, obj)
    await dispatch(initializeBlogs())
  } catch (error) {
    console.error(error)
  }
}

export const deleteSelectedBlogComment =
  (blogId, commentId) => async (dispatch) => {
    try {
      await dispatch(deleteComment({ blogId, commentId }))
      await blogService.deleteBlogComment(blogId, commentId)
    } catch (error) {
      console.error(error)
    }
  }

export default blogsSlice.reducer
