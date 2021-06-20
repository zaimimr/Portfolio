import { Alert, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import theme from 'utils/theme';

const useStyles = makeStyles({
  snackbar: {
    [theme.breakpoints.down('sm')]: {
      left: theme.spacing(1),
      right: theme.spacing(1),
      bottom: theme.spacing(1),
      transform: 'none',
    },
  },
});

type Severity = 'error' | 'warning' | 'info' | 'success';
type SnackbarProps = (title: string, severity: Severity, length?: number) => void;
type Snack = {
  title: string;
  severity: Severity;
  length?: number;
};
const SnackbarContext = createContext<SnackbarProps | undefined>(undefined);

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackTitle, setSnackTitle] = useState('');
  const [severity, setSeverity] = useState<Severity>('info');
  const [length, setLength] = useState<number | undefined>(undefined);
  const [queue, setQueue] = useState<Array<Snack>>([]);

  const showSnackbar: SnackbarProps = useCallback((title, severity, length) => {
    const newSnack: Snack = { title: typeof title === 'string' ? title : JSON.stringify(title), severity: severity, length: length };
    setQueue((prev) => [...prev, newSnack]);
  }, []);

  useEffect(() => {
    let timeout: number;
    const snack = queue[0];
    if (!snackbarOpen && snack) {
      timeout = window.setTimeout(() => {
        setSnackTitle(snack.title);
        setSeverity(snack.severity);
        setLength(snack.length);
        setSnackbarOpen(true);
        setQueue((prev) => prev.slice(1));
      }, 150);
    }
    return () => clearTimeout(timeout);
  }, [queue, snackbarOpen]);

  const value = useMemo(() => showSnackbar, [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar autoHideDuration={length || 3000} className={classes.snackbar} onClose={() => setSnackbarOpen(false)} open={snackbarOpen}>
        <Alert elevation={6} onClose={() => setSnackbarOpen(false)} severity={severity} variant='filled'>
          {snackTitle}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export default useSnackbar;
export { SnackbarProvider, useSnackbar };
