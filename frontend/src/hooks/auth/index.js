import { setLogin, logout, login } from '../../reducers/userReducer'
import { useDispatch } from 'react-redux'
import blogService from '../../services/blogs'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
