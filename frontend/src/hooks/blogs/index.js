/* eslint-disable indent */
import { useState } from 'react'
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

  // State to control dialog visibility and action type
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState(null)
  const [actionData, setActionData] = useState(null)

  const handleOpenDialog = (actionType, data) => {
    setCurrentAction(actionType)
    setActionData(data)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setActionData(null)
    setCurrentAction(null)
  }

  const handleConfirm = async () => {
    try {
      blogsService.setToken(user.token)
      if (currentAction === 'removeBlog') {
        await dispatch(deleteSelectedBlog(actionData.blogData))
      } else if (currentAction === 'deleteBlogComment') {
        await dispatch(
          deleteSelectedBlogComment(actionData.blogId, actionData.commentId)
        )
      }
      handleCloseDialog()
    } catch (exception) {
      console.error(exception)
    }
  }

  const getDialogMessage = () => {
    switch (currentAction) {
      case 'removeBlog':
        return 'Are you sure you want to delete your blog?'
      case 'deleteBlogComment':
        return 'Are you sure you want to delete your comment?'
      default:
        return 'Are you sure you want to proceed?'
    }
  }

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
    handleOpenDialog('removeBlog', { blogData })
  }

  const deleteBlogComment = (blogId, commentId) => {
    handleOpenDialog('deleteBlogComment', { blogId, commentId })
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

  return {
    getBlogs,
    getBlog,
    createBlog,
    removeBlog,
    likeBlog,
    addComment,
    likeBlogComment,
    deleteBlogComment,
    isDialogOpen,
    getDialogMessage,
    handleConfirm,
    handleCloseDialog,
  }
}
