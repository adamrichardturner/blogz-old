import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const registerUser = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)

    if (response.status === 201) {
      console.log('User registered successfully:', response.data)
    } else {
      console.error('Error registering user:', response.data)
    }
  } catch (error) {
    console.error('Error occurred during registration:', error)
  }
}

export default { getUsers, registerUser }
