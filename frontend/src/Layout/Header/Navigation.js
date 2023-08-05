import { NavLink } from 'react-router-dom'
import { Box, Link as MuiLink } from '@mui/material'

function Navigation({ isSmallScreen }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      <NavLink to="/">
        {
          <MuiLink
            component="div"
            marginRight={2}
            sx={{
              fontWeight: '500',
              fontSize: isSmallScreen ? '1rem' : '1.125rem',
            }}
          >
            Posts
          </MuiLink>
        }
      </NavLink>

      <NavLink to="/users">
        {
          <MuiLink
            component="div"
            sx={{
              fontWeight: '500',
              fontSize: isSmallScreen ? '1rem' : '1.125rem',
            }}
          >
            Users
          </MuiLink>
        }
      </NavLink>
    </Box>
  )
}

export default Navigation
