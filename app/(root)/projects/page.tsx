import { Metadata } from 'next';
import Content from './_components/Content';

export const metadata: Metadata = {
  title: 'Projects',
};

const Projects = async () => {
  return <Content />;
};

export default Projects;
