import { useState } from 'react'
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
import { useUser } from '../../hooks/users'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { Link as RouterLink } from 'react-router-dom'
import Loading from '../../common/Loading.js'
import { useTheme } from '@mui/material'

const RegistrationForm = ({ handleLogin }) => {
  const theme = useTheme()
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
    form: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const { username, name, password } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleUserInput = (e) => {
    const value = e.target.value.toLowerCase()
    setFormData((prevData) => ({ ...prevData, username: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }
    setIsLoading(true)
    try {
      const response = await registerNewUser(username, name, password)
      if (response?.token) {
        handleLogin()
      }
    } catch (error) {
      console.error('Error during registration:', error?.message)
      setErrors((prev) => ({
        ...prev,
        form: error?.response?.data?.error || 'An unknown error occurred.',
      }))
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
          Join Blogz
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
                    disabled={isLoading}
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
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    helperText={errors.name}
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                  Register
                </Button>
              </Box>
            </form>
          ) : (
            <Box marginTop={4.5}>
              <Loading mode="small" />
            </Box>
          )}
        </Box>
        <Box marginTop={2}>
          <MuiLink component={RouterLink} to="/login">
            <Typography variant="paragraph" fontSize={14}>
              Go back to login
            </Typography>
          </MuiLink>
        </Box>
      </Container>
    </Box>
  )
}

export default RegistrationForm
