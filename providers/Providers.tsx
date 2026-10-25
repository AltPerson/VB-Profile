import PlayMusicProvider from '@/contexts/play-music-context';
import { Rajdhani, Rationale, Tomorrow } from 'next/font/google';
import { ReactNode } from 'react';

const rajdhani = Rajdhani({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

const tomorrow = Tomorrow({
  weight: ['600'],
  subsets: ['latin'],
  variable: '--font-tomorrow',
});

const rationale = Rationale({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-rationale',
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <body className={`${rajdhani.variable} ${tomorrow.variable} ${rationale.variable}`}>
      <PlayMusicProvider>{children}</PlayMusicProvider>
    </body>
  );
};

export default Providers;
