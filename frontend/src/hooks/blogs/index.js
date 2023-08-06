import { setNotification } from '../../reducers/notificationReducer'
import {
  initializeBlogs,
  createNewBlog,
  deleteSelectedBlog,
  likeSelectedBlog,
  commentSelectedBlog,
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
      dispatch(
        setNotification(
          `a new blog ${blogData.title} by ${blogData.author} added`,
          'positive',
          5000
        )
      )
    } catch (exception) {
      dispatch(setNotification('Missing title or author', 'negative', 5000))
    }
  }

  const removeBlog = (blogData) => {
    if (window.confirm(`Remove blog ${blogData.title} by ${blogData.author}`)) {
      try {
        dispatch(deleteSelectedBlog(blogData))
        dispatch(
          setNotification(
            `Blog ${blogData.title} by ${blogData.author} deleted`,
            'positive',
            5000
          )
        )
      } catch (exception) {
        console.error(exception)
      }
    }
  }

  const likeBlog = async (id, blogData) => {
    try {
      dispatch(likeSelectedBlog(id, blogData))
      dispatch(
        setNotification(`You liked ${blogData.title}.`, 'positive', 5000)
      )
    } catch (exception) {
      console.error(exception)
    }
  }

  const addComment = async (id, obj) => {
    try {
      dispatch(commentSelectedBlog(id, obj))
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
  }
}
