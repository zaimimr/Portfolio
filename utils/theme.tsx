import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f4de5d',
      dark: '#D49A89',
      light: '#F7D1BA',
    },
    secondary: {
      main: '#E2E6EA',
    },
    error: {
      main: '#C11515',
    },
    success: {
      main: '#50C878',
    },
    background: {
      default: '#222931',
      paper: '#393F45',
    },
    text: {
      primary: '#E2E6EA',
      secondary: '#718196',
      disabled: '#4B4949',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

theme.components = {
  ...theme.components,
  MuiButton: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(175, 161, 115, 0.2)',
        border: `1px solid transparent`,
      },
    },
  },
};

export default theme;
