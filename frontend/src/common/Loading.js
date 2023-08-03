import loaderDarkLarge from './loading-dark-large.svg'
import loaderLightLarge from './loading-light-large.svg'
import loaderDarkSmall from './loading-dark-small.svg'
import loaderLightSmall from './loading-light-small.svg'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

const Loading = ({ mode }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  if (mode === 'large') {
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
        <img
          src={darkMode ? loaderDarkLarge : loaderLightLarge}
          alt="Loading Data"
        />
      </Box>
    )
  } else if (mode === 'small') {
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
        <img
          src={darkMode ? loaderDarkSmall : loaderLightSmall}
          alt="Loading Data"
          style={{
            height: '4rem',
            width: '4rem',
          }}
        />
      </Box>
    )
  }
}

export default Loading
