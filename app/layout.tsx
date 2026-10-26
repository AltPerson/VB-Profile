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
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/images/city-poster.webp"
          fetchPriority="high"
        />
        <noscript>
          <style>{`
            .typewriter-reserve { visibility: visible !important; }
            .typewriter-text { display: none !important; }
            [data-typing-complete=false] .after-typing,
            [data-typing-complete=false] .after-typing * {
              visibility: visible !important;
              opacity: 1 !important;
              animation: none !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <Providers>{children}</Providers>
    </html>
  );
}
