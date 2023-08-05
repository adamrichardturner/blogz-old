import {
  Box,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  Switch,
  useMediaQuery,
  Link,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AssignmentIcon from '@mui/icons-material/Assignment'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import { useAuth } from '../../hooks/auth'
import { useTheme } from '../../hooks/theme'
import Navigation from './Navigation'

const Header = ({ theme }) => {
  const { signout } = useAuth()
  const { handleThemeChange, isDarkMode } = useTheme()
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
          <Navigation isSmallScreen={isSmallScreen} />
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          {user ? (
            <>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="paragraph"
                    marginLeft={0.75}
                    sx={{
                      fontSize: isSmallScreen ? '.75rem' : '1rem',
                    }}
                    className="login-status"
                  >
                    <span
                      style={{
                        fontWeight: '800',
                      }}
                    >
                      <Link component={RouterLink} to={`/users/${user.id}`}>
                        {user.name}
                      </Link>
                    </span>{' '}
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
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Box marginTop={2}>
                    <FormGroup
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 0,
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
                          display: 'flex',
                          alignItems: 'flex-end',
                        }}
                      />
                      <LightbulbIcon />
                    </FormGroup>
                  </Box>
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
