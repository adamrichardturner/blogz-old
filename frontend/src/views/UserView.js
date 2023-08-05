import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import Loading from '../common/Loading'
import { Link as MuiLink } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  const allUsers = useSelector((state) => state.user.allUsers)
  if (!allUsers) {
    return <Loading mode="large" />
  }

  const user = allUsers.find((a) => a.id === id)
  const blogs = user.blogs.map((blog) => (
    <MuiLink component={RouterLink} to={`/blogs/${blog.id}`} key={blog.id}>
      <ListItem>
        <ListItemText>
          <Typography varianet="paragraph" color="primary">
            {blog.title}
          </Typography>
        </ListItemText>
      </ListItem>
    </MuiLink>
  ))
  return (
    <Box>
      <Typography variant="h2" color="body">
        User: {user.name}
      </Typography>
      <Typography variant="h3">Blogs added:</Typography>
      <List>{blogs}</List>
    </Box>
  )
}

export default UserView
