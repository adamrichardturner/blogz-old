import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material'
export default function AccountMenu({ user }) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const { signout } = useAuth()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    signout()
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ padding: '0', margin: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                backgroundColor: theme.palette.primary.main,
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 7,
              width: 5,
              height: 5,
              bgcolor: theme.palette.primary,
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            marginBottom: 0,
            padding: '1rem 1rem 1rem 1rem',
          }}
        >
          <Link component={RouterLink} to={`/users/${user.id}`}>
            <Typography variant="paragraph">My Blogz</Typography>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            marginBottom: 0,
            padding: '1rem 1rem 1rem 1rem',
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
