import RegistrationForm from '../common/RegistrationForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterView = ({ theme, user }) => {
  const [loggedIn, setIsLoggedIn] = useState(null)
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsLoggedIn(true)
    navigate('/')
  }

  if (!user || (user === null && !loggedIn) || loggedIn === null) {
    return <RegistrationForm theme={theme} handleLogin={handleLogin} />
  }
}

export default RegisterView
