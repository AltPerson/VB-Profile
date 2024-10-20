'use client';
import { useChangeMusic } from '@/contexts/play-music-context';
import React, { useEffect } from 'react';

const BackgroundMusic = () => {
  const { playMusic } = useChangeMusic();

  useEffect(() => {
    const player = document.getElementsByClassName('audio-element')[0] as HTMLAudioElement;

    if (playMusic) {
      player.volume = 0.2;
      player.play();
      player.muted = false;
    } else {
      player.pause();
      player.muted = true;
    }
  }, [playMusic]);

  return (
    <>
      <audio className="audio-element" loop>
        <source src="/assets/music/bg-song.weba" />
      </audio>
    </>
  );
};

export default BackgroundMusic;
