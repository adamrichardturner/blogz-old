import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: '',
  type: '',
  timeout: 0,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      const { message, type, timeout } = action.payload
      state.notification = message
      state.type = type
      state.timeout = timeout
    },
  },
})

export const { addNotification } = notificationSlice.actions

export const setNotification = (message, type, timeout) => {
  const obj = { message, type, timeout }
  return async (dispatch) => {
    dispatch(addNotification(obj))
  }
}

export default notificationSlice.reducer
