import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 767,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#e79d19',
    },
    secondary: {
      main: '#A16D11',
    },
    background: {
      main: '#33332d',
    },
    dark: {
      main: '#000000',
    },
    danger: {
      main: '#DC3545',
    },
    warning: {
      main: '#A16D11',
    },
    success: {
      main: '#4BB543',
    },
    text: {
      primary: '#fff',
    },
  },
  typography: {
    allVariants: {
      // Global style override for all typography variants
      color: '#ffffff', // Replace '#333' with your desired paragraph color
    },
    paragraph: {
      // Style specific to the 'paragraph' variant
      // (This will override the color set in allVariants)
      color: '#ffffff', // Replace '#555' with your desired paragraph color
    },
    paragraphHeader: {
      // Style specific to the 'paragraph' variant
      // (This will override the color set in allVariants)
      color: '#ffffff', // Replace '#555' with your desired paragraph color
      fontWeight: '600',
      fontStyle: 'italic',
    },
    h1: {
      color: '#ffffff',
      fontFamily: 'League Spartan, sans-serif',
      margin: 0,
      padding: 0,
      marginRight: '10px',
    },
    h2: {
      color: '#ffffff',
      padding: 0,
      margin: '1.75rem 0',
      fontSize: '2rem',
    },
    h3: {
      color: '#ffffff',
      margin: 0,
      padding: 0,
      fontSize: '1.25rem',
      fontWeight: '600',
    },
    // Other typography variants and styles can be defined here
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // Add your custom label styles here
          color: '#fff',
          fontSize: '0.85rem',
          fontWeight: 'bold',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 2,
          background: '#33332d',
          opacity: '0.85',
          borderRadius: '5px',
          color: '#fff',
          height: '3.5rem',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#e79d19',
          textDecoration: 'underline',
          fontWeight: '600',
          '&:hover': {
            textDecoration: 'underline', // Add underline on hover
          },
          // Add any other specific styles you want for the Link component
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          opacity: '1',
          borderBottom: '1px solid white',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {},
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          title: {
            color: (theme) => theme.palette.primary.main,
          },
          border: '2px solid #e79d19',
        },
      },
    },
  },
})
