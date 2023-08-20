import { setDarkMode } from '../../reducers/themeReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export const useTheme = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state) => state.theme.darkMode) // Access the darkMode state from the theme reducer

  useEffect(() => {
    const storedMode = localStorage.getItem('isDarkMode')

    // Check if the user's computer or browser has dark mode settings enabled
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    if (storedMode === null) {
      // Set the default value based on user's computer/browser settings
      const defaultMode = userPrefersDark ? true : false
      localStorage.setItem('isDarkMode', JSON.stringify(defaultMode))
      dispatch(setDarkMode(defaultMode))
    } else {
      dispatch(setDarkMode(storedMode === 'true'))
    }
  }, [])

  const handleThemeChange = () => {
    const newMode = !isDarkMode // derive the new mode from the current Redux state
    localStorage.setItem('isDarkMode', JSON.stringify(newMode)) // update the localStorage
    dispatch(setDarkMode(newMode)) // also update the Redux store
  }

  // const handleThemeChange = () => {
  //   localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode))
  //   dispatch(toggleDarkMode(!isDarkMode))
  // }

  const getDarkMode = () => {
    const storedMode = localStorage.getItem('isDarkMode')
    return storedMode === 'true'
  }

  return {
    isDarkMode,
    getDarkMode,
    handleThemeChange,
  }
}
