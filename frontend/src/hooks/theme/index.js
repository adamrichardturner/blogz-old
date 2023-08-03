import { setDarkMode, toggleDarkMode } from '../../reducers/themeReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

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
