import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 500,
      sm: 767,
      md: 800,
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
      default: '#1E293B',
    },
    paper: {
      main: '#0c121c',
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
      color: '#ffffff',
    },
    paragraph: {
      color: '#ffffff',
    },
    infoText: {
      color: '#ffffff',
      fontSize: '.75rem',
    },
    paragraphHeader: {
      color: '#ffffff',
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
      fontSize: '1.75rem',
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
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '.globalTextareaStyle': {
          fontFamily: 'Poppins, sans-serif',
          width: '100%',
          padding: '14px',
          marginTop: '1rem',
          resize: 'none',
          color: '#fff',
          borderColor: '#fff',
          borderWidth: '.5px',
          fontSize: '1rem',
          borderRadius: '4px',
          opacity: 0.85,
          backgroundColor: '#0c121c',
          '&:focus': {
            borderColor: '#fff',
            borderWidth: '0px',
          },
          '&:focus-visible': {
            borderColor: '#fff',
            borderWidth: '0px',
            outline: '1px solid #fff',
          },
          '&:focus-within': {
            borderColor: '#fff',
            borderWidth: '.5px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#fff',
              borderWidth: '.5px',
            },
            '&:hover fieldset': {
              borderWidth: '1px',
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
              borderColor: '#fff',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          background: '#0c121c',
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
          background: '#0c121c',
          '&:hover': {
            backgroundColor: '#0c121c',
            color: '#fff',
          },
          '&.insideContent-elements': {
            '&.MuiButton-root': {
              backgroundColor: '#1E293B',
              '&:hover': {
                backgroundColor: '#1E293B',
              },
            },
          },
          '&.outsideContent-elements': {
            '&.MuiButton-root': {
              backgroundColor: '#0c121c',
              '&:hover': {
                backgroundColor: '#1E293B',
              },
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
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
          background: '#0c121c',
          opacity: '0.85',
          fontSize: '1rem',
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
          textDecoration: 'none',
          fontWeight: '600',
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
