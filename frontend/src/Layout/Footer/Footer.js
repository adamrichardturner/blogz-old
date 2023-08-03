import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box minHeight="3vh">
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
