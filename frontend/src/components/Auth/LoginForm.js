// LoginForm.js
import { useState } from 'react'
import { useAuth } from '../../hooks/auth'
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Container,
  TextField,
  FormControl,
  Link as MuiLink,
} from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { Link as RouterLink } from 'react-router-dom'
import Loading from '../../common/Loading.js'
import { useTheme } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const theme = useTheme()
  const { authenticate } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    form: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const { username, password } = formData

  const handleUserInput = (e) => {
    const value = e.target.value.toLowerCase()
    setFormData((prevData) => ({ ...prevData, username: value }))
  }

  const handlePasswordInput = (e) => {
    const value = e.target.value
    setFormData((prevData) => ({ ...prevData, password: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    setIsLoading(true)
    try {
      const user = username.toLowerCase()
      const response = await authenticate(user, password)
      if (response?.token) {
        handleLogin()
      } else if (response?.data?.error) {
        setErrors((prev) => ({ ...prev, form: response?.data?.error }))
      }
    } catch (error) {
      console.error('Error during authentication:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    // Validate username
    if (!username.trim()) {
      newErrors.username = 'Username is required'
      isValid = false
    }

    // Validate password
    if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <Box
      minHeight="92vh"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '600px',
        }}
      >
        <Box
          style={{
            display: 'flex',
            marginBottom: 0,
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h1"
            color="primary"
            style={{
              fontSize: isSmallScreen ? '3.15rem' : '5rem',
            }}
          >
            Blogz
          </Typography>
          <AssignmentIcon
            color="primary"
            style={{
              fontSize: isSmallScreen ? '2rem' : '3.5rem',
              margin: 0,
            }}
          />
        </Box>
        <Typography variant="paragraph" padding={0} marginTop={1}>
          Login
        </Typography>
        <Box>
          {errors.form && (
            <Typography variant="paragraph" fontSize={10} color={'red'}>
              {errors.form}
            </Typography>
          )}
        </Box>
        <Box
          width="100%"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!isLoading ? (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Box>
                <FormControl fullWidth>
                  <TextField
                    sx={{
                      marginBottom: 2,
                      color: '#000000',
                    }}
                    label="Username"
                    name="username"
                    value={username}
                    onChange={handleUserInput}
                    helperText={errors.username}
                    className="auth-textfield"
                    disabled={isLoading}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <TextField
                    sx={{
                      marginBottom: 2,
                      color: '#000000',
                    }}
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordInput}
                    helperText={errors.password}
                    className="auth-textfield"
                    disabled={isLoading}
                  />
                </FormControl>
              </Box>
              <Box>
                <Button
                  id="login-button"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={isLoading}
                  sx={{
                    color: theme.palette.text.secondary,
                    borderColor: '#fff',
                    padding: '16px 16px',
                    width: '100%',
                    borderRadius: '5px',
                    marginTop: 0,
                  }}
                >
                  Login
                </Button>
              </Box>
            </form>
          ) : (
            <Box marginTop={4.5}>
              <Loading mode="small" />
            </Box>
          )}
        </Box>
        <Typography
          variant="h3"
          color="primary"
          marginTop={4.5}
          marginBottom={0}
          fontSize={1}
        >
          Not got an account?
        </Typography>
        <Box>
          <Typography variant="paragraph" fontSize={14}>
            <MuiLink component={RouterLink} to="/register">
              Sign up here
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default LoginForm
