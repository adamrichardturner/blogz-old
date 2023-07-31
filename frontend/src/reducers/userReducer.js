import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
  user: null,
  allUsers: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
    setUsers(state, action) {
      state.allUsers = action.payload
    },
    addBlogToUser(state, action) {
      const { username, blogId } = action.payload
      const userToUpdate = state.user.allUsers.find(
        (user) => user.username === username
      )
      if (userToUpdate) {
        userToUpdate.blogs.push(blogId)
      }
    },
  },
})

export const { addUser, logout, setUsers, addBlogToUser } = userSlice.actions

export const setLogin = (username, password) => {
  return async (dispatch) => {
    const lowercaseUsername = username.toLowerCase()
    const lowercasePassword = password.toLowerCase()

    const user = await loginService.login({
      username: lowercaseUsername,
      password: lowercasePassword,
    })

    dispatch(addUser(user))
    blogService.setToken(user.token)
    return user
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers()
    await dispatch(setUsers(users))
  }
}

export const registerUser = (username, name, password) => {
  return async (dispatch) => {
    const lowercaseUsername = username.toLowerCase()
    const lowercaseName = name.toLowerCase()
    const lowercasePassword = password.toLowerCase()
    const user = await userService.registerUser({
      lowercaseUsername,
      lowercaseName,
      lowercasePassword,
    })
    await dispatch(addUser(user))
    await dispatch(setLogin(username, password))
    return user
  }
}

export default userSlice.reducer
