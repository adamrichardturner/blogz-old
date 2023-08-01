import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  Switch,
  useMediaQuery,
  Link as MuiLink,
} from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import { useAuth, useTheme } from '../../hooks'

const Header = ({ theme, handleThemeChange }) => {
  const { signout } = useAuth()
  const { isDarkMode } = useTheme()
  const user = JSON.parse(localStorage.getItem('loggedBlogzApp'))
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogzApp')
    signout()
  }

  const handleSwitch = () => {
    handleThemeChange()
  }

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const styles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.text.primary}`,
    paddingBottom: 10,
    marginTop: '1.75rem',
  }

  const iconColor = theme.palette.type === 'dark' ? '#ffffff' : '#201b2d'

  if (user === null) {
    return null
  }

  return (
    <Box style={{ color: iconColor }}>
      <Box style={styles}>
        <Box>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: isSmallScreen ? '3.15rem' : '5rem',
                marginRight: isSmallScreen ? '5px' : '10px',
              }}
              color="primary"
            >
              Blogz
            </Typography>
            <AssignmentIcon
              style={{
                color: iconColor,
                fontSize: isSmallScreen ? '2rem' : '3.5rem',
              }}
            />
          </Box>
          <MuiLink
            component={RouterLink}
            to="/"
            sx={{
              marginRight: 2.5,
              fontWeight: '500',
              fontSize: isSmallScreen ? '1rem' : '1.125rem',
            }}
          >
            Posts
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/users"
            sx={{
              fontWeight: '500',
              fontSize: isSmallScreen ? '1rem' : '1.125rem',
            }}
          >
            Users
          </MuiLink>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          {user ? (
            <>
              <Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: '600',
                      fontSize: isSmallScreen ? '.75rem' : '1.25rem',
                    }}
                    className="login-user"
                  >
                    {user.name}
                  </Typography>{' '}
                  <Typography
                    sx={{
                      fontSize: isSmallScreen ? '.75rem' : '1rem',
                    }}
                    className="login-status"
                  >
                    is logged in
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: 'right',
                  }}
                >
                  <Button
                    id="login-button"
                    variant="contained"
                    type="submit"
                    color="primary"
                    sx={{
                      color: '#fff',
                      borderColor: '#fff',
                      marginTop: '10px',
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <FormGroup
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 0,
                        paddingTop: '2.5rem',
                        flexDirection: 'row',
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isDarkMode}
                            onChange={handleSwitch}
                          />
                        }
                        sx={{
                          marginRight: 0,
                          padding: 0,
                        }}
                      />
                      <LightbulbIcon />
                    </FormGroup>
                  </Box>
                  <Box></Box>
                </Box>
              </Box>
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}

export default Header
