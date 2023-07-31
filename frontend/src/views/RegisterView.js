import RegistrationForm from '../common/RegistrationForm'
import { Navigate } from 'react-router-dom'

const RegisterView = ({ isLoggedIn, theme }) => {
  if (!isLoggedIn) {
    return <RegistrationForm theme={theme} />
  }
  return <Navigate replace to="/login" />
}

export default RegisterView
