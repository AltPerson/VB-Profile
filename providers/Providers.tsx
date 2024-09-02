import LanguageProvider from '@/contexts/language-context';
import PlayMusicProvider from '@/contexts/play-music-context';
import { Rajdhani, Tomorrow } from 'next/font/google';
import localFont from 'next/font/local';
import React, { ReactNode } from 'react';

const rajdhani = Rajdhani({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

const tomorrow = Tomorrow({
  weight: ['600'],
  subsets: ['latin'],
  variable: '--font-tomorrow',
});

const agencyFb = localFont({
  src: [
    {
      path: '../public/assets/fonts/agencyfb_bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/agencyfb_reg.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-agencyFb',
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <body className={`${rajdhani.variable} ${tomorrow.variable} ${agencyFb.variable}`}>
      <PlayMusicProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </PlayMusicProvider>
    </body>
  );
};

export default Providers;
