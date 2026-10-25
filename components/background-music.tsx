'use client';
import { useChangeMusic } from '@/contexts/play-music-context';

export default function BackgroundMusic() {
  const { registerPlayer, syncPlayback } = useChangeMusic();
  return (
    <audio
      ref={registerPlayer}
      className="audio-element"
      loop
      preload="none"
      onPlaying={syncPlayback}
      onPause={syncPlayback}
      onEnded={syncPlayback}
      onError={syncPlayback}
    >
      <source src="/assets/music/bg-song.weba" type="audio/webm" />
    </audio>
  );
}
