import { createTheme } from '@mui/material/styles';

// Create a custom theme using createTheme function
const theme = createTheme({
  palette: {
    primary: {
      main: '#768a96',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          borderColor: 'transparent',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#7bd6b0',
            borderColor: 'transparent',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '1rem',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px',
          padding: '6px',
          '&:hover': {
            backgroundColor: '#b5c2ca',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          minWidth: '8rem',
          marginTop: '0.5rem',
          borderRadius: '1rem',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
        },
      },
    },
  },
});

export default theme;
