import LoginForm from '../common/LoginForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginView = ({ theme, user }) => {
  const [loggedIn, setIsLoggedIn] = useState(null)
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsLoggedIn(true)
    navigate('/')
  }

  if (!user || (user === null && !loggedIn) || loggedIn === null) {
    return (
      <LoginForm loggedIn={loggedIn} handleLogin={handleLogin} theme={theme} />
    )
  }
  return null
}

export default LoginView
