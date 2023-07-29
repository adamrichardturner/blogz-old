import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Alert, AlertTitle, Box } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import './Notification.css'
import { useMediaQuery } from '@mui/material'

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notification.notification)
  const type = useSelector((state) => state.notification.type)
  const timeout = useSelector((state) => state.notification.timeout)

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  function truncateString(s) {
    if (s.length <= 120) {
      return s
    } else {
      return s.slice(0, 120)
    }
  }

  const [visible, setVisible] = useState(false) // State to control the visibility of the notification

  useEffect(() => {
    if (message) {
      // Show the notification
      setVisible(true)

      // Set a timer to hide the notification after the specified timeout
      const timer = setTimeout(() => {
        setVisible(false)
        dispatch(setNotification('', '', 0))
      }, timeout)

      return () => clearTimeout(timer)
    }
  }, [message, timeout, dispatch])

  if (message === null || message === '') {
    return null
  }

  let alertStyle
  // Depending on the notification type, change the style
  if (type === 'positive') {
    alertStyle = 'warning'
  } else if (type === 'negative') {
    alertStyle = 'error'
  }

  return (
    <Box
      className={`notification ${visible ? 'notification-show' : ''}`}
      sx={{
        width: '400px',
      }}
    >
      {/* Add 'notification-show' class when 'visible' is true */}
      <Alert
        severity={alertStyle}
        sx={{
          width: isSmallScreen ? '100%' : '100%',
        }}
        icon={<AssignmentIcon color="primary" />}
      >
        <AlertTitle color="primary">Success!</AlertTitle>
        {truncateString(message)}
      </Alert>
    </Box>
  )
}

export default Notification
