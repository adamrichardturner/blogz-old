import {
  initializeBlogs,
  createNewBlog,
  deleteSelectedBlog,
  likeSelectedBlog,
  commentSelectedBlog,
  likeSelectedBlogComment,
  deleteSelectedBlogComment,
} from '../../reducers/blogsReducer'
import { initializeUsers } from '../../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogsService from '../../services/blogs'

export const useBlogs = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const getBlogs = async () => {
    try {
      const blogs = await dispatch(initializeBlogs())
      return blogs
    } catch (error) {
      console.error(error)
    }
  }

  const getBlog = async (id) => {
    try {
      const blogs = await dispatch(initializeBlogs())
      const blog = blogs.find((b) => b.id === id)
      return blog
    } catch (error) {
      console.error(error)
    }
  }

  const createBlog = async (blogData) => {
    try {
      blogsService.setToken(user.token)
      await dispatch(createNewBlog(blogData))
      await dispatch(initializeUsers())
    } catch (exception) {
      console.error(exception)
    }
  }

  const removeBlog = (blogData) => {
    try {
      blogsService.setToken(user.token)
      dispatch(deleteSelectedBlog(blogData))
    } catch (exception) {
      console.error(exception)
    }
  }

  const likeBlog = async (id, blogData) => {
    try {
      blogsService.setToken(user.token)
      dispatch(likeSelectedBlog(id, blogData))
    } catch (exception) {
      console.error(exception)
    }
  }

  const addComment = async (id, obj) => {
    try {
      blogsService.setToken(user.token)
      dispatch(commentSelectedBlog(id, obj))
    } catch (exception) {
      console.error(exception)
    }
  }

  const likeBlogComment = async (blogId, commentId) => {
    try {
      blogsService.setToken(user.token)
      dispatch(likeSelectedBlogComment(blogId, commentId))
    } catch (exception) {
      console.error(exception)
    }
  }

  const deleteBlogComment = async (blogId, commentId) => {
    try {
      blogsService.setToken(user.token)
      dispatch(deleteSelectedBlogComment(blogId, commentId))
    } catch (exception) {
      console.error(exception)
    }
  }

  return {
    getBlogs,
    getBlog,
    createBlog,
    removeBlog,
    likeBlog,
    addComment,
    likeBlogComment,
    deleteBlogComment,
  }
}
