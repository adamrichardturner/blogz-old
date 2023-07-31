import { useState } from 'react'
import Notification from '../components/Notification/Notification'
import {
  TextField,
  Button,
  Container,
  Typography,
  useMediaQuery,
  Link as MuiLink,
} from '@mui/material'
import { useUser } from '../hooks'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { Navigate, Link as RouterLink } from 'react-router-dom'

const RegistrationForm = ({ theme }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { registerNewUser } = useUser()

  const handleRegister = async (event) => {
    event.preventDefault()

    if (password.length < 5 || !/\d/.test(password)) {
      setError(
        'Password must be at least 5 characters long and contain a number'
      )
      return
    }

    setError('')

    const user = await registerNewUser(username, name, password)

    if (user) {
      return <Navigate replace to="/" />
    }

    setUsername('')
    setName('')
    setPassword('')
  }

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
        {error && <Typography>{error}</Typography>}
        <Typography
          variant="h2"
          sx={{
            padding: 0,
            margin: '0 0 2rem 0',
          }}
        >
          Join Blogz
        </Typography>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          <div>
            <TextField
              fullWidth
              sx={{
                marginBottom: 2,
                color: '#000000',
              }}
              label="Username"
              variant="filled"
              value={username}
              required
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              sx={{
                marginBottom: 2,
                color: '#000000',
              }}
              label="Name"
              value={name}
              required
              variant="filled"
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              sx={{
                marginBottom: 2,
                color: '#000000',
              }}
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              required
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
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
        </form>
        <Typography variant="h2">Back to Login</Typography>
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
