import RegistrationForm from '../components/Auth/RegistrationForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterView = ({ theme, user }) => {
  const [loggedIn, setIsLoggedIn] = useState(null)
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsLoggedIn(true)
    navigate('/')
  }

  if (user || loggedIn) {
    navigate('/')
    return null
  }

  return <RegistrationForm theme={theme} handleLogin={handleLogin} />
}

export default RegisterView
