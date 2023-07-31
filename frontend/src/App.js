import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Layout/Header/Header'
import Footer from './Layout/Footer/Footer'
import BlogsView from './views/BlogsView'
import BlogView from './views/BlogView'
import UserSummaryView from './views/UserSummaryView'
import UserView from './views/UserView'
import LoginView from './views/LoginView'
// import RegisterView from './views/RegisterView'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { useBlogs, useUser, useAuth } from './hooks'
import { Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from './theme/lightTheme'
import { darkTheme } from './theme/darkTheme'

const App = () => {
  const { getBlogs } = useBlogs()
  const { getAll } = useUser()
  const { user } = useAuth()

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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Header
          handleThemeChange={handleThemeChange}
          isDarkMode={isDarkMode}
          theme={theme}
          user={user}
        />
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <LoginView theme={theme} user={user} />
              </>
            }
          />
          {/* <Route
            path="/register"
            element={
              <>
                <RegisterView theme={theme} />
              </>
            }
          /> */}
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <UserView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserSummaryView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <ProtectedRoute>
                <BlogView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <BlogsView theme={theme} />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Container>
    </ThemeProvider>
  )
}

export default App
