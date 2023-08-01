import { Typography } from '@mui/material'

const Footer = () => {
  return (
    <footer
      style={{
        margin: '2rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
  )
}

export default Footer
