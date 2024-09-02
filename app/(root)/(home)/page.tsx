import { Metadata } from 'next';
import Content from './_components/Content';

export const metadata: Metadata = {
  title: 'VB',
};

export default async function HomePage() {
  return <Content />;
}
