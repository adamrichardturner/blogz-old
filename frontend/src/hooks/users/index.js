import { setNotification } from '../../reducers/notificationReducer'
import { initializeBlogs } from '../../reducers/blogsReducer'
import {
  setLogin,
  logout,
  initializeUsers,
  registerUser,
} from '../../reducers/userReducer'
import { useDispatch } from 'react-redux'
import blogService from '../../services/blogs'

export const useUser = () => {
  const dispatch = useDispatch()

  const getAll = async () => {
    try {
      await dispatch(initializeUsers())
    } catch (error) {
      console.error(error)
    }
  }

  const loginUser = async (username, password) => {
    try {
      const user = await dispatch(setLogin(username, password))
      if (user) {
        window.localStorage.setItem('loggedBlogzApp', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setNotification(`${user.name} logged in`, 'positive', 5000))
        return user
      }
    } catch (error) {
      console.error(error)
    }
  }

  const logoutUser = () => {
    try {
      dispatch(logout())
      window.localStorage.removeItem('loggedBlogzApp')
    } catch (error) {
      console.error(error)
    }
  }

  const registerNewUser = async (username, name, password) => {
    try {
      await dispatch(registerUser(username, name, password))
      const user = await dispatch(setLogin(username, password))

      if (!user) {
        throw new Error('Failed to log in the new user')
      }

      window.localStorage.setItem('loggedBlogzApp', JSON.stringify(user))
      blogService.setToken(user.token)
      await dispatch(initializeUsers())
      await dispatch(initializeBlogs())
      dispatch(
        setNotification(`${user.name} joined and logged in`, 'positive', 5000)
      )
      console.log(user)
      return user
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    loginUser,
    logoutUser,
    getAll,
    registerNewUser,
  }
}
