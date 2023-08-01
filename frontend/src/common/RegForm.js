import { useState } from 'react'
import { TextField, Button, FormControl, FormHelperText } from '@mui/material'

const MyForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
      isValid = false
    }

    // Validate email
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format'
      isValid = false
    }

    // Validate password
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Submit the form or perform further actions
      console.log('Form is valid. Submitting...')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          error={!!errors.username}
          helperText={errors.username}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  )
}

export default MyForm
