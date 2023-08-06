import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
    },
  },
})

export const { toggleDarkMode, setDarkMode } = themeSlice.actions

export default themeSlice.reducer
