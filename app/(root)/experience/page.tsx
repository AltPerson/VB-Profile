import { siteMetadata } from '@/constants/site-metadata';
import { Metadata } from 'next';
import Content from './_components/Content';

export const metadata: Metadata = {
  title: 'Experience',
  alternates: { canonical: 'https://vb-profile.netlify.app/experience' },
  openGraph: { ...siteMetadata.openGraph, url: 'https://vb-profile.netlify.app/experience' },
};

const Experience = async () => {
  return <Content />;
};

export default Experience;
