import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
  user: null,
  allUsers: null,
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload
      state.isLoggedIn = true
    },
    logout(state) {
      state.user = null
      state.isLoggedIn = false
    },
    setUsers(state, action) {
      state.allUsers = action.payload
    },
    addBlogToUser(state, action) {
      const { username, blogId } = action.payload
      const userToUpdate = state.allUsers.find(
        (user) => user.username === username
      )
      if (userToUpdate) {
        userToUpdate.blogs.push(blogId)
      }
    },
  },
})

export const { login, logout, setUsers, addBlogToUser } = userSlice.actions

export const setLogin = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })
    blogService.setToken(user.token)
    await dispatch(login(user))
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
    const user = await userService.registerUser({
      username,
      name,
      password,
    })
    await dispatch(login(user))
    await dispatch(setLogin(username, password))
    return user
  }
}

export default userSlice.reducer
