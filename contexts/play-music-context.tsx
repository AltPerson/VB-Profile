'use client';

import { IPlayMusicContext } from '@/types/interfaces';
import { ReactNode, createContext, useContext, useState } from 'react';

export const PlayMusicContext = createContext<IPlayMusicContext>({
  playMusic: false,
  setPlayMusic: () => {},
});

export default function PlayMusicProvider({ children }: { children: ReactNode }) {
  const [playMusic, setPlayMusic] = useState(false);

  return (
    <PlayMusicContext.Provider value={{ playMusic, setPlayMusic }}>
      {children}
    </PlayMusicContext.Provider>
  );
}

export const useChangeMusic = () => {
  const { playMusic, setPlayMusic } = useContext(PlayMusicContext);

  const togglePlayMusic = () => setPlayMusic((prev) => !prev);

  return {
    playMusic,
    togglePlayMusic,
  };
};
