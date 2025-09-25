import Providers from '@/providers/Providers';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VB',
  description: 'Vladyslav Bondarchuk portfolio website',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>{children}</Providers>
    </html>
  );
}
