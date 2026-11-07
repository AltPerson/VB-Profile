import { siteMetadata } from '@/constants/site-metadata';
import { Metadata } from 'next';
import Content from './_components/Content';

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: 'https://vb-profile.netlify.app/contact' },
  openGraph: { ...siteMetadata.openGraph, url: 'https://vb-profile.netlify.app/contact' },
};

const Contact = () => <Content />;

export default Contact;
