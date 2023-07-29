import Loader from '../loading.svg'
import { Box } from '@mui/material'

const Loading = () => {
  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={Loader} alt="Loading Data" />
    </Box>
  )
}

export default Loading
