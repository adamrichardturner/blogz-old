// ConfirmationDialog.jsx
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'

const ConfirmationDialog = ({ open, content, onConfirm, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText color="primary" fontSize={'1.25rem'}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className="insideContent-elements"
          variant="contained"
          color="primary"
          id="comment"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="insideContent-elements"
          variant="contained"
          color="primary"
          id="comment"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
