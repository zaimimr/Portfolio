import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { GitHub, Web } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import Image from 'next/image';
import { ProjectImageCardType } from 'utils/types';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'grid',
    padding: '0 8%',
  },
  textCard: {
    borderRadius: '20px',
    position: 'absolute',
    top: '20%',
    width: '40%',
  },
});

const ProjectImageCard = ({ align, project }: ProjectImageCardType) => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-aos='fade-up' style={{ justifyContent: `${align}` }}>
      <Image height='500' loading='eager' src={project.img} width='900' />
      <ProjectPaper align={align} project={project} />
    </div>
  );
};

const ProjectPaper = ({ align, project }: ProjectImageCardType) => {
  const classes = useStyles();

  return (
    <Card className={classes.textCard} style={align === 'right' ? { left: 0 } : { right: 0 }}>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
            <Typography variant='h4'>{project.title}</Typography>
            <Typography color='textSecondary' variant='subtitle1'>
              {new Date(project.date).toLocaleDateString()}
            </Typography>
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
        </div>
        <Typography paragraph variant='body1'>
          {project.text}
        </Typography>
      </CardContent>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
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
    </Card>
  );
};

export default ProjectImageCard;
