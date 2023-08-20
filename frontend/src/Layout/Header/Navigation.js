import { NavLink } from 'react-router-dom'
import { Box, Link as MuiLink } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'

function Navigation({ isSmallScreen, scroll, iconColor }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {scroll > 221 && (
        <AssignmentIcon
          style={{
            color: iconColor,
            fontSize: '2rem',
            marginLeft: '0',
            marginRight: '.5rem',
          }}
        />
      )}
      <NavLink to="/">
        {
          <MuiLink
            component="div"
            marginRight={1}
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
