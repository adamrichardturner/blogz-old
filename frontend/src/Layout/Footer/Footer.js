import { Box, Typography, Divider } from '@mui/material'

const Footer = () => {
  return (
    <Box
      minHeight="3vh"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '2rem',
      }}
    >
      <Divider
        variant="middle"
        sx={{
          width: 100,
          backgroundColor: 'primary.main',
          color: 'primary.main',
        }}
      />
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem 0',
        }}
      >
        <p>
          <Typography variant="paragraph">Blogz | Made by </Typography>
          <a
            href="https://adamrichardturner.dev"
            target="_blank"
            rel="noreferrer"
            color="primary"
            style={{
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Adam Turner
          </a>
        </p>
      </footer>
    </Box>
  )
}

export default Footer
