import { NavLink } from 'react-router-dom'
import { Box, Link as MuiLink } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useNavigate } from 'react-router-dom'

function Navigation({ isSmallScreen, scroll, iconColor }) {
  const navigate = useNavigate()

  const handleHomeButton = () => {
    navigate('/')
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {scroll > 10 && (
        <AssignmentIcon
          style={{
            color: iconColor,
            fontSize: '2rem',
            marginLeft: '0',
            marginRight: '.5rem',
          }}
          onClick={handleHomeButton}
          cursor={'pointer'}
        />
      )}
      <NavLink to="/">
        {
          <MuiLink
            component="div"
            paddingRight={'1rem'}
            sx={{
              fontWeight: '500',
              fontSize: isSmallScreen ? '1rem' : '1.125rem',
            }}
            onClick={scrollToTop}
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
            onClick={scrollToTop}
          >
            Users
          </MuiLink>
        }
      </NavLink>
    </Box>
  )
}

export default Navigation
