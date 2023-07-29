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
import Loading from './Loading'

const UserSummary = () => {
  const allUsers = useSelector((state) => state.user.allUsers)
  if (!allUsers) {
    return <Loading />
  }
  return (
    <Box>
      <Typography variant="h2" color="primary">
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
                <Link to={`/users/${user.id}`}>
                  <Typography
                    variant="paragraph"
                    color="primary"
                    sx={{
                      textDecoration: 'underline',
                    }}
                  >
                    {user.name}
                  </Typography>
                </Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default UserSummary
