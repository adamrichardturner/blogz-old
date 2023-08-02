// import RegistrationForm from '../common/RegistrationForm'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const RegisterView = ({ theme, user }) => {
//   const [loggedIn, setIsLoggedIn] = useState(null)
//   const navigate = useNavigate()

//   const handleLogin = () => {
//     setIsLoggedIn(true)
//     navigate('/')
//   }

//   if (!user || (user === null && !loggedIn) || loggedIn === null) {
//     return <RegistrationForm theme={theme} handleLogin={handleLogin} />
//   }
// }

// export default RegisterView

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

  // If the user is already logged in or registration was successful, navigate away.
  if (user || loggedIn) {
    navigate('/')
    return null
  }

  // If user is not logged in and registration hasn't been done, show the registration form.
  return <RegistrationForm theme={theme} handleLogin={handleLogin} />
}

export default RegisterView
