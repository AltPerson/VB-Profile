import { siteMetadata } from '@/constants/site-metadata';
import { Metadata } from 'next';
import Content from './_components/Content';

export const metadata: Metadata = {
  title: 'Projects',
  alternates: { canonical: 'https://vb-profile.netlify.app/projects' },
  openGraph: { ...siteMetadata.openGraph, url: 'https://vb-profile.netlify.app/projects' },
};

const Projects = async () => {
  return <Content />;
};

export default Projects;
