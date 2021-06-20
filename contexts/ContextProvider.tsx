import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'contexts/Snackbar';
import theme from 'utils/theme';
const ContextProvider = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

export default ContextProvider;
