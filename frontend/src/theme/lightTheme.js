import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
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
    type: 'light',
    primary: {
      main: '#201b2d',
    },
    secondary: {
      main: '#A16D11',
    },
    body: {
      main: '#111111',
    },
    background: {
      default: '#ffffff',
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
      primary: '#111111',
      secondary: '#000000',
      tertiary: '#111111',
    },
  },
  typography: {
    allVariants: {
      // Global style override for all typography variants
      color: '#000000', // Replace '#333' with your desired paragraph color
    },
    paragraph: {
      // Style specific to the 'paragraph' variant
      // (This will override the color set in allVariants)
      color: '#000000', // Replace '#555' with your desired paragraph color
    },
    paragraphHeader: {
      // Style specific to the 'paragraph' variant
      // (This will override the color set in allVariants)
      color: '#000000', // Replace '#555' with your desired paragraph color
      fontWeight: '600',
      fontStyle: 'italic',
    },
    h1: {
      color: '#000000',
      fontFamily: 'League Spartan, sans-serif',
      margin: 0,
      padding: 0,
      marginRight: '10px',
    },
    h2: {
      color: '#000000',
      padding: 0,
      fontSize: '2rem',
    },
    h3: {
      color: '#000000',
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
          background: '#CDCDCD,',
          elevation: '3',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#fff',
          borderColor: '#fff',
          marginTop: '10px',
          background: '#222a41',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // Add your custom label styles here
          color: '#000000',
          fontSize: '0.85rem',
          fontWeight: 'bold',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 2,
          background: '#ffffff',
          opacity: '0.85',
          borderRadius: '5px',
          color: '#000000',
          height: '3.5rem',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'underline',
          fontWeight: '600',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid black',
        },
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
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: 'absolute',
          top: '0px', // Adjust as per your requirement
          right: '0', // Adjust as per your requirement
          // Other styles if necessary
        },
      },
    },
  },
})
