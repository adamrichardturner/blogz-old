import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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

const UserSummaryView = () => {
  const allUsers = useSelector((state) => state.user.allUsers)
  if (!allUsers) {
    return <Loading mode="large" />
  }
  return (
    <Box>
      <Typography variant="h2" color="body" marginTop={2} marginBottom={2}>
        Users Summary
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Blogs Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user.username}>
              <TableCell>
                <Typography variant="paragraph" color="primary">
                  {user.name}{' '}
                  <Link to={`/users/${user.id}`}> {`(${user.username})`}</Link>
                </Typography>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default UserSummaryView
