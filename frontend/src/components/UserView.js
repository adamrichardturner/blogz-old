import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import Loading from './Loading'

const UserView = () => {
  const id = useParams().id
  const allUsers = useSelector((state) => state.user.allUsers)
  if (!allUsers) {
    return <Loading />
  }
  const user = allUsers.find((a) => a.id === id)
  const blogs = user.blogs.map((blog) => (
    <ListItem key={blog.id}>
      <ListItemText>{blog.title}</ListItemText>
    </ListItem>
  ))
  return (
    <Box>
      <Typography variant="h2" color="primary">
        User: {user.name}
      </Typography>
      <Typography variant="h3">Blogs added:</Typography>
      <List>{blogs}</List>
    </Box>
  )
}

export default UserView
