import { siteMetadata } from '@/constants/site-metadata';
import { Metadata } from 'next';
import Content from './_components/Content';

export const metadata: Metadata = {
  title: 'Skills',
  alternates: { canonical: 'https://vb-profile.netlify.app/skills' },
  openGraph: { ...siteMetadata.openGraph, url: 'https://vb-profile.netlify.app/skills' },
};

const Skills = () => <Content />;

export default Skills;
