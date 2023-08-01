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
} from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
// import { Link as RouterLink } from 'react-router-dom'

const LoginForm = ({ handleLogin, theme }) => {
  const { authenticate } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await authenticate(username, password)
    if (user !== null) {
      setUsername('')
      setPassword('')
      handleLogin()
    }
  }

  // const handleRegister = () => {
  //   setUsername('')
  //   setPassword('')
  // }

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const iconColor = theme.palette.type === 'dark' ? '#ffffff' : '#000000'

  return (
    <>
      <Notification />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
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
        </Box>
        <Typography
          variant="h2"
          sx={{
            padding: 0,
            margin: '0 0 2rem 0',
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box>
            <TextField
              fullWidth
              sx={{
                marginBottom: 2,
                color: '#000000',
              }}
              label="Username"
              id="username"
              type="text"
              value={username}
              name="Username"
              variant="filled"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              sx={{
                marginBottom: 2,
                color: '#000000',
              }}
              label="Password"
              type="password"
              value={password}
              name="Password"
              variant="filled"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Box>
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
        </form>
        {/* <Typography variant="h2">Not got an account?</Typography>
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
            Register
          </Button>
        </MuiLink> */}
      </Container>
    </>
  )
}

export default LoginForm
