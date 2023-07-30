import { useEffect, useState } from 'react'
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Header from './Layout/Header/Header'
import Footer from './Layout/Footer/Footer'
import BlogsView from './views/BlogsView'
import BlogView from './views/BlogView'
import Notification from './components/Notification/Notification'
import LoginView from './views/LoginView'
import UserSummaryView from './views/UserSummaryView'
import UserView from './views/UserView'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { useBlogs, useUser } from './hooks'
import { addUser } from './reducers/userReducer'
import { Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from './theme/lightTheme'
import { darkTheme } from './theme/darkTheme'

const App = () => {
  const { getBlogs } = useBlogs()
  const { getAll } = useUser()
  const dispatch = useDispatch()

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get the mode from localStorage, or use true if not found
    const storedMode = JSON.parse(localStorage.getItem('isDarkMode'))
    return storedMode !== null ? storedMode : true
  })

  const theme = isDarkMode ? darkTheme : lightTheme

  const handleThemeChange = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    // Store the updated mode in localStorage
    localStorage.setItem('isDarkMode', JSON.stringify(newMode))
  }

  useEffect(() => {
    const bodyBackground = isDarkMode ? '#33332d' : '#fff'
    document.body.style.backgroundColor = bodyBackground
  }, [isDarkMode])

  useEffect(() => {
    const getLatest = async () => {
      await getBlogs()
      await getAll()
    }
    getLatest()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      let user = JSON.parse(loggedUserJSON)
      dispatch(addUser(user))
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  // Use the useSelector hook to get the user state from Redux store
  const { user } = useSelector((state) => state.user)

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Router>
          {user !== null && (
            <Header
              handleThemeChange={handleThemeChange}
              isDark={isDarkMode}
              theme={theme}
            />
          )}
          <Notification />
          <Routes>
            {/* Redirect to login if user is not logged in */}
            {user === null && (
              <Route path="/" element={<Navigate to="/login" />} />
            )}
            <Route path="/users/:id" element={<UserView />} />
            <Route path="/users" element={<UserSummaryView />} />
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route
              path="/login"
              element={<LoginView theme={theme} isRegistration={false} />}
            />
            <Route
              path="/register"
              element={<LoginView theme={theme} isRegistration={true} />}
            />
            <Route path="/" element={<BlogsView />} />
          </Routes>
          <Footer />
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App
