import { setDarkMode } from '../../reducers/themeReducer'
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
      localStorage.setItem('isDarkMode', JSON.stringify(false)) // Default preference
      dispatch(setDarkMode(false)) // Also update the Redux store
    } else {
      // Sync the Redux store with localStorage value
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
