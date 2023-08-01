import { setNotification } from '../reducers/notificationReducer'
import {
  initializeBlogs,
  createNewBlog,
  deleteSelectedBlog,
  likeSelectedBlog,
  commentSelectedBlog,
} from '../reducers/blogsReducer'
import {
  setLogin,
  logout,
  initializeUsers,
  registerUser,
  login,
} from '../reducers/userReducer'
import { setDarkMode, toggleDarkMode } from '../reducers/themeReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useBlogs = () => {
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
    await dispatch(registerUser(username, name, password))
    const user = await dispatch(setLogin(username, password))
    console.log(user)
    try {
      if (user) {
        window.localStorage.setItem('loggedBlogzApp', JSON.stringify(user))
        blogService.setToken(user.token)
        await dispatch(initializeUsers())
        await dispatch(initializeBlogs())
        dispatch(
          setNotification(`${user.name} joined and logged in`, 'positive', 5000)
        )
        console.log(user)
        return user
      }
    } catch (error) {
      setNotification(
        `${user.name} registration failed: ${error}`,
        'negative',
        5000
      )
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

export const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userState, setUserState] = useLocalStorage('loggedBlogzApp', null)

  useEffect(() => {
    const updatedState = async (state) => {
      await dispatch(login(state))
    }
    if (userState) {
      updatedState(userState)
    }
  }, [userState, dispatch])

  const authenticate = async (username, password) => {
    try {
      const user = await dispatch(setLogin(username, password))
      blogService.setToken(user.token)
      setUserState(user)
      dispatch(login(user))
      return user
    } catch (error) {
      if (error.response) {
        return error.response
      }
    }
  }

  const signout = async () => {
    try {
      await dispatch(logout())
      blogService.setToken(null)
      setUserState(null)
      navigate('/login', { replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    user: userState,
    authenticate,
    signout,
  }
}

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName)
      if (value && value !== 'undefined') {
        return JSON.parse(value)
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (err) {
      console.error('Failed to get value from localStorage:', err)
      return defaultValue
    }
  })

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue))
      setStoredValue(newValue)
    } catch (err) {
      console.error('Failed to set value in localStorage:', err)
    }
  }

  return [storedValue, setValue]
}

export const useTheme = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state) => state.theme.darkMode) // Access the darkMode state from the theme reducer

  useEffect(() => {
    // Check if isDarkMode exists in local storage
    const storedMode = localStorage.getItem('isDarkMode')
    if (storedMode === null) {
      // if it doesn't exist, set a default value
      localStorage.setItem('isDarkMode', JSON.stringify(true)) // Default preference
      dispatch(setDarkMode(true)) // Also update the Redux store
    } else {
      // Sync the Redux store with localStorage value
      dispatch(setDarkMode(storedMode === 'true'))
    }
  }, [])

  const handleThemeChange = () => {
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode))
    dispatch(toggleDarkMode(!isDarkMode))
  }

  const getDarkMode = () => {
    const storedMode = localStorage.getItem('isDarkMode')
    return storedMode === 'true'
  }

  const setNewDarkMode = (isDark) => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDark))
    // Dispatch the setDarkMode action to the reducer with the new value
    dispatch(setDarkMode(isDark))
  }

  return {
    isDarkMode,
    getDarkMode,
    setNewDarkMode,
    handleThemeChange,
  }
}
