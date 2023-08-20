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
} from '@mui/material'
import Loading from '../common/Loading'
import { Link } from 'react-router-dom'

const UserSummaryView = () => {
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
  return (
    <Box marginBottom={5} marginTop={'110px'}>
      <Typography variant="h2" color="body" marginTop={2} marginBottom={2}>
        Blogz Users
      </Typography>
      <Table
        sx={{
          marginTop: '.5rem',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                padding: 0,
              }}
            >
              <Typography
                variant="paragraph"
                color="primary"
                fontWeight={'600'}
              >
                Username
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                padding: 0,
              }}
            >
              <Typography
                variant="paragraph"
                color="primary"
                fontWeight={'600'}
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
                  component={Link}
                  to={`/users/${user.id}`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '1.25rem 1rem 1.25rem 0',
                    lineHeight: '1',
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
                  component={Link}
                  to={`/users/${user.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '1.25rem 1rem 1.25rem 0',
                    lineHeight: '1',
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
