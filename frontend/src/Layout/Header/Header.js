import { Navigate, Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useUser } from '../../hooks'
import { Button, Typography, Link as MuiLink } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useMediaQuery } from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'

const Header = ({ handleThemeChange, theme, isLoggedIn, isDarkMode }) => {
  const { user } = useSelector((state) => state.user)
  const { logoutUser } = useUser()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    logoutUser()
  }

  const handleDarkModeChange = () => {
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

  const iconColor = theme.palette.type === 'dark' ? '#ffffff' : '#000000'

  if (!isLoggedIn) {
    return <Navigate replace to="/login" />
  } else {
    return (
      <div style={{ color: iconColor }}>
        <div style={styles}>
          <div>
            <div
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
            </div>
            <MuiLink component={RouterLink} to="/" style={{ marginRight: 15 }}>
              Posts
            </MuiLink>
            <MuiLink component={RouterLink} to="/users">
              Users
            </MuiLink>
          </div>
          <div>
            {user ? (
              <>
                <div>
                  <div>
                    <span
                      style={{
                        fontWeight: '600',
                        fontSize: isSmallScreen ? '.75rem' : '1.25rem',
                        color: '#e79d19',
                      }}
                      className="login-user"
                    >
                      {user.name}
                    </span>{' '}
                    <span
                      style={{
                        fontSize: isSmallScreen ? '.75rem' : '1.25rem',
                      }}
                      className="login-status"
                    >
                      is logged in
                    </span>
                  </div>
                  <div
                    style={{
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
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <FormGroup
                        style={{
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
                              onChange={handleDarkModeChange}
                            />
                          }
                          sx={{
                            marginRight: 0,
                            padding: 0,
                          }}
                        />
                        <LightbulbIcon />
                      </FormGroup>
                    </div>
                    <div></div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Header
