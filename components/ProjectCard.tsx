import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { GitHub, Web } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { ProjectCardType } from 'utils/types';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'grid',
    padding: '0 8%',
  },
  textCard: {
    borderRadius: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const ProjectCard = ({ project }: ProjectCardType) => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-aos='fade-up'>
      <ProjectPaper project={project} />
    </div>
  );
};

const ProjectPaper = ({ project }: ProjectCardType) => {
  const classes = useStyles();

  return (
    <Card className={classes.textCard}>
      <CardContent>
        <div className={classes.buttonGroup}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
              <Typography variant='h4'>{project.title}</Typography>
              <Typography color='textSecondary' variant='subtitle1'>
                {new Date(project.date).toLocaleDateString()}
              </Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {project.github && (
              <Button href={project.github} rel='noopener noreferrer' startIcon={<GitHub />} target='_blank' variant='outlined'>
                View on Github
              </Button>
            )}
            {project.web && (
              <Button href={project.web} rel='noopener noreferrer' startIcon={<Web />} target='_blank' variant='outlined'>
                View Demo
              </Button>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <Typography color='textSecondary' variant='h6'>
            {project.subtitle}
          </Typography>
          {'•'}
          <Typography color='primary' style={{ backgroundColor: 'rgba(175, 161, 115, 0.2)', padding: '0 3px' }} variant='caption'>
            {project.language}
          </Typography>
        </div>
        <Typography paragraph variant='body1'>
          {project.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
