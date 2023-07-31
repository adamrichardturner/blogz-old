import LoginForm from '../common/LoginForm'
import { Navigate } from 'react-router-dom'
const LoginView = ({ isLoggedIn, theme }) => {
  if (!isLoggedIn) {
    return <LoginForm theme={theme} />
  }
  return <Navigate replace to="/" />
}

export default LoginView
