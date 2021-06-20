import { Container, Stack, Typography, useMediaQuery } from '@material-ui/core';
import Header from 'components/Header';
import ProjectCard from 'components/ProjectCard';
import ProjectCardMobile from 'components/ProjectCardMobile';
import ProjectImageCard from 'components/ProjectImageCard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import safeJsonStringify from 'safe-json-stringify';
import { db } from 'utils/firebase';
import theme from 'utils/theme';
import { IProject } from 'utils/types';

export const getServerSideProps: GetServerSideProps = async () => {
  const myProjects = await db
    .collection('my_projects')
    .orderBy('date', 'desc')
    .get()
    .then((data) =>
      data.docs.map((doc) => {
        const d = doc.data();
        d.id = doc.id;
        d.date = d.date.toDate();
        return d;
      }),
    );
  const projects = JSON.parse(safeJsonStringify(myProjects));
  return { props: { projects } };
};

const Home = ({ projects }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div>
      <Head>
        <title>Zaim Imran</title>
        <meta content='Generated by create next app' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <Container maxWidth='lg'>
        <div style={{ paddingTop: `${matches ? '5vh' : '20vh'}` }} />
        <Header />
        <div style={{ paddingTop: '31vh' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography paragraph variant='h2'>
            Projects
          </Typography>
        </div>
        <Stack spacing={16}>
          {projects.map((project: IProject, index: number) => {
            if (matches) {
              return <ProjectCardMobile key={project.id} project={project} />;
            } else if (project.img) {
              return <ProjectImageCard align={index % 2 === 0 ? 'left' : 'right'} key={project.id} project={project} />;
            } else {
              return <ProjectCard key={project.id} project={project} />;
            }
          })}
        </Stack>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
          <Typography>
            Website made by{' '}
            <a
              href='https://github.com/Zenjjim'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none', color: theme.palette.text.primary }}
              target='_blank'>
              @Zenjjim
            </a>
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Home;