import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Layout/Header/Header'
import Notification from './components/Notification/Notification'
import Footer from './Layout/Footer/Footer'
import BlogsView from './views/BlogsView'
import BlogView from './views/BlogView'
import UserSummaryView from './views/UserSummaryView'
import UserView from './views/UserView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { useBlogs } from './hooks/blogs'
import { useUser } from './hooks/users'
import { useAuth } from './hooks/auth'
import { useTheme } from './hooks/theme'
import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from './theme/lightTheme'
import { darkTheme } from './theme/darkTheme'

const App = () => {
  const { getBlogs } = useBlogs()
  const { getAll } = useUser()
  const { user } = useAuth()
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? darkTheme : lightTheme

  useEffect(() => {
    const getLatest = async () => {
      await getBlogs()
      await getAll()
    }
    getLatest()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Header theme={theme} user={user} />
        <Notification />
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <LoginView theme={theme} user={user} />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <RegisterView theme={theme} />
              </>
            }
          />
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
                <BlogView theme={theme} />
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
