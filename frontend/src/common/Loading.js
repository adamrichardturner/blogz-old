import loaderDark from './loading-dark.svg'
import loaderLight from './loading-light.svg'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

const Loading = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
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
      <img src={darkMode ? loaderDark : loaderLight} alt="Loading Data" />
    </Box>
  )
}

export default Loading
