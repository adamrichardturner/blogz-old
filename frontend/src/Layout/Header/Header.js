import { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Typography,
  useMediaQuery,
  ButtonBase,
} from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useTheme } from '../../hooks/theme'
import Navigation from './Navigation'
import AccountMenu from '../../common/AccountMenu'
import DarkModeToggle from '../../common/DarkModeToggle'
import { useNavigate } from 'react-router-dom'

const Header = ({ theme }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const { handleThemeChange, isDarkMode } = useTheme()
  const user = JSON.parse(localStorage.getItem('loggedBlogzApp'))
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  const handleScroll = () => {
    setScrollPosition(window.scrollY)
    setIsVisible(window.scrollY > 10)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll
    })
  }

  const handleSwitch = () => {
    handleThemeChange()
  }

  const handleHomeButton = () => {
    navigate('/')
    handleScrollToTop()
  }

  const headerStyle = {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(-10%)',
    transition: 'transform 0.3s ease-in-out',
    backgroundColor: theme.palette.background.default,
  }

  const iconColor = theme.palette.type === 'dark' ? '#ffffff' : '#201b2d'
  const shadowStyle =
    theme.palette.type === 'dark'
      ? 'rgba(255, 255, 255, 0.1) 0px 2px 3px 0px'
      : 'rgba(0, 0, 0, 0.1) 0px 2px 3px 0px'

  if (user === null) {
    return null
  }

  return (
    <Box
      width={'100%'}
      padding={0}
      style={{
        ...headerStyle,
        color: iconColor,
        boxShadow: isVisible ? shadowStyle : 'none',
        transition: 'box-shadow .3s ease-in-out',
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          maxWidth: theme.breakpoints.down('md'),
          padding: isVisible
            ? isSmallScreen
              ? '16px'
              : '16px 24px 16px 24px'
            : isSmallScreen
            ? '32px 16px 16px 16px'
            : '32px 24px 16px 24px',
        }}
      >
        <Box>
          <ButtonBase
            className="logo-container"
            onClick={handleHomeButton}
            cursor={'pointer'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            {!isVisible && (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: isSmallScreen ? '2.5rem' : '3rem',
                      marginRight: isSmallScreen ? '2px' : '5px',
                      transition: 'all 0.3s',
                      lineHeight: 1.15,
                    }}
                    color="primary"
                  >
                    Blogz
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AssignmentIcon
                    style={{
                      color: iconColor,
                      fontSize: isSmallScreen ? '1.65rem' : '2rem',
                    }}
                  />
                </Box>
              </Box>
            )}
          </ButtonBase>
          <Navigation
            isSmallScreen={isSmallScreen}
            scroll={scrollPosition}
            iconColor={iconColor}
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginRight: '.5rem',
              }}
            >
              <DarkModeToggle checked={isDarkMode} onChange={handleSwitch} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <AccountMenu user={user} onClick={handleScrollToTop} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Header
