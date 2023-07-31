import RegistrationForm from '../common/RegistrationForm'

const RegisterView = ({ theme }) => {
  const user = JSON.parse(localStorage.getItem('loggedBlogzApp'))
  if (!user || user === null) {
    return <RegistrationForm theme={theme} />
  }
}

export default RegisterView
