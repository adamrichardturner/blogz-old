import { Typography } from '@mui/material'

const Footer = () => {
  return (
    <footer
      style={{
        minHeight: 72,
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
          style={{
            color: '#e79d19',
            cursor: 'pointer',
          }}
        >
          Adam Turner
        </a>
      </p>
    </footer>
  )
}

export default Footer
