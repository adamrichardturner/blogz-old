import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import BlogsList from './components/BlogsList'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import UserSummary from './components/UserSummary'
import UserView from './components/UserView'
import { useDispatch, useSelector } from 'react-redux'
import { useBlogs, useUser } from './hooks'
import blogService from './services/blogs'
import { addUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Footer from './components/Footer'
import { lightTheme } from './theme/lightTheme'
import { darkTheme } from './theme/darkTheme'
import Notification from './components/Notification'

const App = () => {
  let loggedUser = useSelector((state) => state.user)
  const { user } = loggedUser
  const { getBlogs } = useBlogs()
  const { getAll } = useUser()
  const dispatch = useDispatch()

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get the mode from localStorage, or use true if not found
    const storedMode = JSON.parse(localStorage.getItem('isDarkMode'))
    return storedMode !== null ? storedMode : false
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
    const getLatest = () => {
      const blogs = getBlogs()
      const users = getAll()
      console.log(users)
      console.log(blogs)
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

  if (user === null) {
    return (
      <ThemeProvider theme={theme}>
        <LoginForm theme={theme} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Router>
          <Navigation
            handleThemeChange={handleThemeChange}
            isDark={isDarkMode}
            theme={theme}
          />
          <Notification />
          <Routes>
            <Route path="/users/:id" element={<UserView />} />
            <Route path="/users" element={<UserSummary />} />
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route path="/" element={<BlogsList />} />
          </Routes>
          <Footer />
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App
