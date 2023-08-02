import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// const registerUser = async (credentials) => {
//   try {
//     const response = await axios.post(baseUrl, credentials)

//     if (response.status === 201) {
//       console.log('User registered successfully:', response.data)
//     } else {
//       console.error('Error registering user:', response.data)
//     }
//   } catch (error) {
//     console.error('Error occurred during registration:', error)
//   }
// }
// const registerUser = async (credentials) => {
//   try {
//     const response = await axios.post(baseUrl, credentials)

//     if (response.status === 201) {
//       console.log('User registered successfully:', response.data)
//       return response.data // Return the newly created user data, which may include a token or other info.
//     } else {
//       // This might not be hit because axios throws an error for non 2xx status codes.
//       // So any error logic is likely to be handled in the catch block.
//       console.error('Error registering user:', response.data)
//       throw new Error(response.data.error || 'Error registering user') // Throw an error with the message from the backend or a default message.
//     }
//   } catch (error) {
//     console.error(
//       'Error occurred during registration:',
//       error.response ? error.response.data : error
//     )
//     throw error // Re-throw the error so it can be handled or caught elsewhere.
//   }
// }

const registerUser = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)

    if (response.status === 201) {
      console.log('User registered successfully:', response.data)
      return response.data
    } else {
      console.error('Error registering user:', response.data)
      throw new Error(response.data.error || 'Registration error')
    }
  } catch (error) {
    console.error('Error occurred during registration:', error)
    throw error
  }
}

export default { getUsers, registerUser }
