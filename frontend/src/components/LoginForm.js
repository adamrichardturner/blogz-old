import { useState } from 'react'
import { useUser } from '../hooks'
import Notification from './Notification'
import { Container, TextField, Button } from '@mui/material'
import { Typography, useMediaQuery } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'

const LoginForm = ({ theme }) => {
  const { loginUser } = useUser('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    loginUser(username, password)
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
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <div>
            <TextField
              fullWidth
              sx={{
                marginBottom: 2,
                background: '#A16D11',
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
          </div>
          <div>
            <TextField
              fullWidth
              sx={{
                background: '#A16D11',
                color: '#000000',
              }}
              label="Password"
              type="password"
              value={password}
              name="Password"
              variant="filled"
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
            Login
          </Button>
          {/* <button id="login-button" type="submit">
        login
      </button> */}
        </form>
      </Container>
    </>
  )
}

export default LoginForm
