import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonBase,
  useTheme,
} from '@mui/material'
import Loading from '../common/Loading'
import { Link } from 'react-router-dom'

const UserView = () => {
  const theme = useTheme()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs.blogs)

  if (!blogs) {
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

  // Filtering the blogs based on user id
  const rawBlogs = blogs.filter((blog) => blog.user.id === id)

  const userBlogs = [...rawBlogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  const blogRows = userBlogs.map((blog) => (
    <TableRow key={blog.id} hover role="checkbox">
      <TableCell
        sx={{
          padding: 0,
        }}
      >
        <ButtonBase
          component={Link}
          to={`/blogs/${blog.id}`}
          onClick={handleScrollToTop}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '1rem 1rem 1rem .5rem',
            lineHeight: '1',
          }}
        >
          <Typography variant="paragraph" color="primary">
            {blog.title}
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
          to={`/blogs/${blog.id}`}
          onClick={handleScrollToTop}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '1rem 1rem 1rem .5rem',
            lineHeight: '1',
          }}
        >
          <Box>
            {new Date(blog.createdAt).toLocaleDateString()}{' '}
            {new Date(blog.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Box>
        </ButtonBase>
      </TableCell>
      <TableCell align="center">
        <ButtonBase
          component={Link}
          to={`/blogs/${blog.id}`}
          onClick={handleScrollToTop}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 1rem 1rem .5rem',
            lineHeight: '1',
            textAlign: 'center',
          }}
        >
          <Typography variant="paragraph" color="primary">
            {blog.comments.length}
          </Typography>
        </ButtonBase>
      </TableCell>
      <TableCell align="center">
        <ButtonBase
          component={Link}
          to={`/blogs/${blog.id}`}
          onClick={handleScrollToTop}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 1rem 1rem .5rem',
            lineHeight: '1',
          }}
        >
          <Box>{blog.likedBy.length || 0}</Box>
        </ButtonBase>
      </TableCell>
    </TableRow>
  ))

  return (
    <Box marginBottom={5} minHeight={'77vh'} marginTop={'110px'}>
      <Typography
        variant="h2"
        color="body"
        marginTop={'16px'}
        marginBottom={2}
        textAlign={userBlogs.length > 0 ? 'left' : 'center'}
      >
        {userBlogs.length > 0
          ? `Blogs by ${userBlogs[0]?.user.name || 'User'}`
          : `No Blogs made yet by ${userBlogs[0]?.user.name || 'User'}`}
      </Typography>
      {userBlogs.length > 0 && (
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
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  padding: '1.25rem .5rem',
                  lineHeight: '1rem',
                }}
              >
                <Typography
                  variant="paragraph"
                  color="primary"
                  fontWeight={'700'}
                  backgroundColor="primary"
                  fontSize={'1rem'}
                  paddingRight={'1rem'}
                >
                  Title
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  padding: '1.25rem .5rem',
                  lineHeight: '1rem',
                }}
              >
                <Typography
                  variant="paragraph"
                  color="primary"
                  fontWeight={'700'}
                  backgroundColor="primary"
                  fontSize={'1rem'}
                  paddingRight={'1rem'}
                  lineHeight={'1rem'}
                >
                  Date Posted
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  padding: '1.25rem .5rem',
                  lineHeight: '1rem',
                }}
              >
                <Typography
                  variant="paragraph"
                  color="primary"
                  fontWeight={'700'}
                  backgroundColor="primary"
                  fontSize={'1rem'}
                >
                  Comments
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  padding: '1.25rem .5rem',
                  lineHeight: '1rem',
                }}
              >
                <Typography
                  variant="paragraph"
                  color="primary"
                  fontWeight={'700'}
                  backgroundColor="primary"
                  fontSize={'1rem'}
                >
                  Likes
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{blogRows}</TableBody>
        </Table>
      )}
    </Box>
  )
}

export default UserView
