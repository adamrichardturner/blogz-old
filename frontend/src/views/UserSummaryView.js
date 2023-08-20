import { useSelector } from 'react-redux'
import { ButtonBase } from '@mui/material'
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
} from '@mui/material'
import Loading from '../common/Loading'
import { Link } from 'react-router-dom'

const UserSummaryView = () => {
  const theme = useTheme()
  const allUsers = useSelector((state) => state.user.allUsers)

  if (!allUsers) {
    return (
      <Box
        minHeight={'72vh'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loading mode="large" />
      </Box>
    )
  }

  const handleScrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <Box marginBottom={5} marginTop={'110px'} minHeight={'83vh'}>
      <Typography variant="h2" color="body" marginTop={2} marginBottom={2}>
        Blogz Users
      </Typography>
      <Table
        sx={{
          marginTop: '.5rem',
        }}
      >
        <TableHead
          sx={{
            backgroundColor: theme.palette.head.main,
            '& .MuiTableRow-root:hover': {
              backgroundColor: `${theme.palette.head.main} !important`,
            },
            lineHeight: '1.5rem',
          }}
        >
          <TableRow
            sx={{
              borderBottom: '1px solid black',
            }}
          >
            <TableCell
              sx={{
                padding: '1.25rem .5rem',
              }}
            >
              <Typography
                variant="paragraph"
                color="primary"
                fontWeight={'700'}
                backgroundColor="primary"
                fontSize={'1rem'}
              >
                User
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                padding: '1.25rem .5rem',
              }}
            >
              <Typography
                variant="paragraph"
                color="primary"
                fontWeight={'700'}
                fontSize={'1rem'}
                lineHeight={1}
              >
                Blogs Created
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user.id} hover role="checkbox">
              <TableCell
                sx={{
                  padding: 0,
                }}
              >
                <ButtonBase
                  component={user.blogs.length <= 0 ? 'div' : Link}
                  to={user.blogs.length > 0 ? `/users/${user.id}` : '#'}
                  onClick={(e) => {
                    if (user.blogs.length > 0) {
                      handleScrollToTop()
                    } else {
                      e.preventDefault()
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '1rem 1rem 1rem .5rem',
                    lineHeight: '1',
                    cursor: user.blogs.length <= 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Typography variant="paragraph" color="primary">
                    {user.name}{' '}
                    <span
                      style={{ fontWeight: 800 }}
                    >{`(${user.username})`}</span>
                  </Typography>
                </ButtonBase>
              </TableCell>
              <TableCell
                sx={{
                  padding: 0,
                }}
              >
                <ButtonBase
                  component={user.blogs.length <= 0 ? 'div' : Link}
                  to={user.blogs.length > 0 ? `/users/${user.id}` : '#'}
                  onClick={(e) => {
                    if (user.blogs.length > 0) {
                      handleScrollToTop()
                    } else {
                      e.preventDefault()
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '1rem 1rem 1rem .5rem',
                    lineHeight: '1',
                    cursor: user.blogs.length <= 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  {user.blogs.length}
                </ButtonBase>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default UserSummaryView
