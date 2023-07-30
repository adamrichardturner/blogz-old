import LoginForm from '../common/LoginForm'
import RegistrationForm from '../common/RegistrationForm'
import { useSelector } from 'react-redux'

const LoginView = ({ theme, isRegistration }) => {
  const { user } = useSelector((state) => state.user)

  if (user === null) {
    return (
      <>
        {isRegistration ? (
          <RegistrationForm theme={theme} />
        ) : (
          <>
            <LoginForm theme={theme} />
          </>
        )}
      </>
    )
  }

  return <LoginForm theme={theme} />
}

export default LoginView
