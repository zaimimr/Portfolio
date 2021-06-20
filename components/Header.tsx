import { Paper, Stack, Tooltip, Typography } from '@material-ui/core';
import { Description, GitHub, LinkedIn, MailOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { analytics } from 'utils/firebase';
import theme from 'utils/theme';

import Avatar from './Avatar';

const useStyles = makeStyles({
  header: {
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    gridTemplateColumns: '0.5fr 1fr',
    [theme.breakpoints.down('md')]: {
      gridTemplateRows: '1fr 1fr',
      gridTemplateColumns: 'unset',
    },
  },
  headerName: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  paper: {
    padding: '12px',
    borderRadius: '8px',
    width: 'fit-content',
  },
  icon: {
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  avatar: {
    height: "400px",
    width: "400px"
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.avatar}>
        <Avatar />
      </div>
      <div className={classes.headerName}>
        <Typography paragraph variant='h1'>
          Hi, I&apos;m Zaim.
        </Typography>
        <div>
          <Paper className={classes.paper} elevation={8}>
            <Stack direction='row' spacing={3}>
              <Tooltip title='Email'>
                <a className={classes.icon} href='mailto:zaim.imran@gmail.com' onClick={() => analytics().logEvent('Email')}>
                  <MailOutline fontSize='large' />
                </a>
              </Tooltip>
              <Tooltip title='Github'>
                <a
                  className={classes.icon}
                  href='https://github.com/Zenjjim'
                  onClick={() => analytics().logEvent('Github')}
                  rel='noopener noreferrer'
                  target='_blank'>
                  <GitHub fontSize='large' />
                </a>
              </Tooltip>
              <Tooltip title='LinkedIn'>
                <a
                  className={classes.icon}
                  href='https://www.linkedin.com/in/zaim/'
                  onClick={() => analytics().logEvent('LinkedIn')}
                  rel='noopener noreferrer'
                  target='_blank'>
                  <LinkedIn fontSize='large' />
                </a>
              </Tooltip>
              <Tooltip title='Resume'>
                <a
                  className={classes.icon}
                  href='https://www.dropbox.com/s/099cb2fgs4vw9xi/Zaim_Imran_CV_2021.pdf?dl=0'
                  onClick={() => analytics().logEvent('Resume')}
                  rel='noopener noreferrer'
                  target='_blank'>
                  <Description fontSize='large' />
                </a>
              </Tooltip>
            </Stack>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Header;
