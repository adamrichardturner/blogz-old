import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'

const Togglable = forwardRef((props, ref) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode)
  const [visible, setVisible] = useState(false)
  console.log(isDarkMode)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const { theme } = props

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <Box>
      {!visible && (
        <Button
          variant="contained"
          sx={{
            color: '#fff',
            borderColor: '#fff',
            padding: '6px 16px',
          }}
          className="toggle-button"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      )}
      <Modal
        open={visible}
        onClose={toggleVisibility}
        aria-labelledby="modal-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          bgcolor={theme.palette.paper.main}
          boxShadow={24}
          p={4}
          width={isSmallScreen ? '90%' : '600px'}
          borderRadius="8px"
        >
          {props.children}
          <Button
            variant="contained"
            sx={{
              color: '#fff',
              borderColor: '#fff',
              padding: '6px 16px',
            }}
            onClick={toggleVisibility}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
