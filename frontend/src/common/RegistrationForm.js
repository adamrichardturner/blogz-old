import { useState } from 'react'
import Notification from '../components/Notification/Notification'
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  useMediaQuery,
  FormControl,
  Link as MuiLink,
} from '@mui/material'
import { useUser } from '../hooks'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { Link as RouterLink } from 'react-router-dom'

const RegistrationForm = ({ theme, handleLogin }) => {
  const { registerNewUser } = useUser()

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    name: '',
    password: '',
  })

  const { username, name, password } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      const response = await registerNewUser(username, name, password)
      console.log(response)
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
    } else if (username.length > 20) {
      newErrors.username = 'Username must be less than 20 characters'
      isValid = false
    } else if (/\s/.test(username)) {
      newErrors.username = 'Username cannot contain spaces'
      isValid = false
    }

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    } else if (name.length > 20) {
      newErrors.name = 'Name must be less than 20 characters'
      isValid = false
    } else if (/\d/.test(name)) {
      newErrors.name = 'Name cannot contain numbers'
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
        <div
          style={{
            display: 'flex',
            marginBottom: 10,
            alignItems: 'center',
          }}
        >
          <Typography variant="h1">Blogz</Typography>
          <AssignmentIcon
            style={{
              color: iconColor,
              fontSize: isSmallScreen ? '2rem' : '3.5rem',
            }}
          />
        </div>
        <Typography
          variant="p"
          sx={{
            padding: 0,
            marginTop: 2,
          }}
        >
          Join Blogz
        </Typography>
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
                label="Name"
                name="name"
                value={name}
                onChange={handleInputChange}
                helperText={errors.name}
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
              Register
            </Button>
          </Box>
        </form>
        <Typography
          variant="h3"
          sx={{
            marginTop: 4,
          }}
        >
          Back to Login
        </Typography>
        <MuiLink component={RouterLink} to="/login">
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
            Back to Login
          </Button>
        </MuiLink>
      </Container>
    </>
  )
}

export default RegistrationForm
