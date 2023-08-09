import { createSlice } from '@reduxjs/toolkit' // Importing the necessary function from Redux Toolkit
import blogService from '../services/blogs' // Importing a blog service module

const initialState = {
  blogs: [], // Initial state with an empty array for blogs
}

const blogsSlice = createSlice({
  name: 'blogs', // Name of the slice
  initialState, // Initial state object
  reducers: {
    appendBlog(state, action) {
      // Reducer for appending a new blog to the state
      state.blogs.push(action.payload) // Add the payload (new blog) to the blogs array
    },
    setBlogs(state, action) {
      // Reducer for setting the blogs array to a new value
      state.blogs = action.payload // Replace the blogs array with the payload (new array of blogs)
    },
    likeBlog(state, action) {
      const id = action.payload.id
      const userId = action.payload.userId
      const blogToLike = state.blogs.find((b) => b.id === id)
      if (blogToLike) {
        if (blogToLike.likedBy.includes(userId)) {
          blogToLike.likedBy = blogToLike.likedBy.filter(
            (uid) => uid !== userId
          ) // Remove user ID (unlike)
        } else {
          blogToLike.likedBy.push(userId) // Add user ID (like)
        }
      }
    },
    deleteBlog(state, action) {
      // Reducer for deleting a blog
      const id = action.payload.id // Extract the ID of the blog to be deleted from the payload
      state.blogs = state.blogs.filter((b) => b.id !== id) // Return a new array without the deleted blog
    },
    appendComment(state, action) {
      console.log(action.payload)
      const { id, comment } = action.payload
      console.log(id, comment)
      const blogToComment = state.blogs.find((b) => b.id === id)

      const updatedBlog = {
        ...blogToComment,
        comments: [...blogToComment.comments, comment],
      }

      // Replace the blogToComment in the state.blogs array with the updatedBlog
      state.blogs = state.blogs.map((b) => (b.id === id ? updatedBlog : b))
    },
  },
})

export const { appendBlog, setBlogs, likeBlog, deleteBlog, appendComment } =
  blogsSlice.actions // Exporting the reducer functions as named exports

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll() // Fetching all blogs from the blog service module
    await dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = (blogData) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blogData)
    dispatch(appendBlog(newBlog))
  } catch (error) {
    console.error(error)
  }
}

export const likeSelectedBlog = (id) => async (dispatch, getState) => {
  try {
    const userId = getState().auth.userId

    // Toggle like/unlike immediately for UI feedback
    dispatch(likeBlog({ id, userId }))

    // Send the request to the backend to persistently store the like/unlike
    await blogService.toggleLike(id, userId)

    // If needed, update the Redux state with the data returned from the backend
  } catch (error) {
    console.error(error)
    alert('Failed to update the like. Please try again.')
  }
}

export const deleteSelectedBlog = (blogData) => async (dispatch) => {
  try {
    await blogService.deleteBlog(blogData.id)
    await dispatch(deleteBlog(blogData))
  } catch (error) {
    console.error(error)
  }
}

export const commentSelectedBlog = (id, obj) => async (dispatch) => {
  const appendObj = {
    comment: obj,
    id,
  }
  try {
    await blogService.commentBlog(id, obj)
    await dispatch(appendComment(appendObj))
  } catch (error) {
    console.error(error)
  }
}

export default blogsSlice.reducer
