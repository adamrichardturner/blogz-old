// LoginForm.js
import { useState } from 'react'
import { useAuth } from '../hooks'
import Notification from '../components/Notification/Notification'
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Container,
  TextField,
  FormControl,
  FormHelperText,
  Link as MuiLink,
} from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { Link as RouterLink } from 'react-router-dom'
import Loading from './Loading'

const LoginForm = ({ handleLogin }) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        const response = await authenticate(username, password)
        if (response.token) {
          handleLogin()
        } else if (response.data.error) {
          setErrors((prev) => ({ ...prev, form: response.data.error }))
        }
      } catch (error) {
        console.error('Error during authentication:', error)
      } finally {
        setIsLoading(false)
      }
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
      newErrors.password = 'Password must be at least 5 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <Box
      minHeight="97vh"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Notification />
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
          {errors.form && <FormHelperText error>{errors.form}</FormHelperText>}
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
                    onChange={handleInputChange}
                    helperText={errors.username}
                    className="auth-textfield"
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
                    onChange={handleInputChange}
                    helperText={errors.password}
                    className="auth-textfield"
                  />
                </FormControl>
              </Box>
              <Box>
                <Button
                  id="login-button"
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={{
                    color: '#fff',
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
            <Loading mode="small" />
          )}
        </Box>
        <Typography
          variant="h3"
          color="primary"
          marginTop={4.5}
          marginBottom={1}
        >
          Not got an account?
        </Typography>
        <Box>
          <MuiLink component={RouterLink} to="/register">
            <Button
              id="register-button"
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{
                color: '#fff',
                borderColor: '#fff',
                padding: '16px 16px',
                width: '100%',
                borderRadius: '5px',
                marginTop: 0,
              }}
            >
              Register Here
            </Button>
          </MuiLink>
        </Box>
      </Container>
    </Box>
  )
}

export default LoginForm
