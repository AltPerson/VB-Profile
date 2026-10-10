'use client';
import { useChangeMusic } from '@/contexts/play-music-context';
import { useEffect } from 'react';

const BackgroundMusic = () => {
  const { playMusic } = useChangeMusic();

  useEffect(() => {
    const player = document.getElementsByClassName('audio-element')[0] as HTMLAudioElement;
    if (playMusic) {
      player.volume = 0.2;
      player.muted = false;
      void player.play().catch(() => {
        // Browsers may reject playback until the user explicitly interacts with the page.
      });
    } else {
      player.pause();
      player.muted = true;
    }
  }, [playMusic]);

  return (
    <>
      <audio className="audio-element" loop preload="none">
        <source src="/assets/music/bg-song.weba" type="audio/webm" />
      </audio>
    </>
  );
};

export default BackgroundMusic;
