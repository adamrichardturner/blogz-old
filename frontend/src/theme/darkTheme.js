import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 500,
      sm: 767,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#201b2d',
    },
    body: {
      main: '#fff',
    },
    background: {
      default: '#33332d',
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
      primary: '#ffffff',
      secondary: '#000000',
      tertiary: '#ffffff',
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
      fontSize: '2.5rem',
      [`@media (min-width:${(theme) => theme.breakpoints.values.xs}px)`]: {
        fontSize: '1.25rem',
        margin: 0,
      },
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          background: '#212121',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#fff',
          textDecoration: 'none',
          borderColor: '#fff',
          marginTop: '10px',
          background: '#222a41',
          '&:hover': {
            backgroundColor: '#222a41', // Change the background color on hover
            color: '#fff', // Change the text color on hover
          },
        },
      },
    },
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
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#fff',
              borderWidth: '.5px',
            },
            '&:hover fieldset': {
              borderWidth: '1px',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
            },
          },
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
          color: '#fff',
          textDecoration: 'underline',
          fontWeight: '600',
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
            color: (theme) => theme.palette.secondary.main,
          },
          border: '2px solid #e79d19',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: 'absolute',
          top: '0px',
          right: '0',
        },
      },
    },
  },
})
