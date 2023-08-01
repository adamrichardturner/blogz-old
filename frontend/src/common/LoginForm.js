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

const LoginForm = ({ handleLogin, theme }) => {
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

  const { username, password } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      const response = await authenticate(username, password)
      if (response.token) {
        handleLogin()
      } else if (response.data.error) {
        setErrors((prev) => ({ ...prev, form: response.data.error }))
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
      newErrors.password = 'Password must be at least 4 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const iconColor = theme.palette.type === 'dark' ? '#ffffff' : '#000000'

  return (
    <>
      <Notification />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          style={{
            display: 'flex',
            marginBottom: 0,
            alignItems: 'center',
          }}
        >
          <Typography variant="h1">Blogz</Typography>
          <AssignmentIcon
            style={{
              color: iconColor,
              fontSize: isSmallScreen ? '2rem' : '3.5rem',
              margin: 0,
            }}
          />
        </Box>
        <Typography
          variant="p"
          sx={{
            padding: 0,
            marginTop: 2,
          }}
        >
          Login
        </Typography>
        <Box>
          {errors.form && <FormHelperText error>{errors.form}</FormHelperText>}
        </Box>
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
              }}
            >
              Login
            </Button>
          </Box>
        </form>
        <Typography
          variant="h3"
          sx={{
            marginTop: 4,
          }}
        >
          Not got an account?
        </Typography>
        <MuiLink component={RouterLink} to="/register">
          <Button
            id="register-button"
            variant="contained"
            color="primary"
            sx={{
              color: '#fff',
              borderColor: '#fff',
              padding: '16px 16px',
              width: '100%',
              borderRadius: '5px',
            }}
          >
            Register Here
          </Button>
        </MuiLink>
      </Container>
    </>
  )
}

export default LoginForm
