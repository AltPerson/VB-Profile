'use client';
import { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';

type MusicContext = {
  playMusic: boolean;
  pending: boolean;
  audioError: string | null;
  togglePlayMusic: () => void;
  registerPlayer: (player: HTMLAudioElement | null) => void;
  syncPlayback: () => void;
};
export const PlayMusicContext = createContext<MusicContext>({
  playMusic: false,
  pending: false,
  audioError: null,
  togglePlayMusic: () => {},
  registerPlayer: () => {},
  syncPlayback: () => {},
});
export default function PlayMusicProvider({ children }: { children: ReactNode }) {
  const player = useRef<HTMLAudioElement | null>(null);
  const requested = useRef(false),
    requestId = useRef(0);
  const [playMusic, setPlaying] = useState(false),
    [pending, setPending] = useState(false);
  const [audioError, setError] = useState<string | null>(null);
  const registerPlayer = useCallback((element: HTMLAudioElement | null) => {
    requestId.current++;
    requested.current = false;
    player.current = element;
    if (element) {
      element.pause();
      element.muted = true;
      element.volume = 0.2;
    }
    setPlaying(false);
    setPending(false);
  }, []);
  const syncPlayback = useCallback(() => {
    const audio = player.current;
    if (!audio) return;
    if (audio.error) {
      requestId.current++;
      requested.current = false;
      audio.muted = true;
      audio.pause();
      setPlaying(false);
      setPending(false);
      setError('Sound unavailable. Try again.');
    } else if (audio.paused || audio.ended) {
      requested.current = false;
      setPlaying(false);
      setPending(false);
    } else if (!requested.current) {
      audio.pause();
      audio.muted = true;
      setPlaying(false);
      setPending(false);
    } else {
      setPlaying(!audio.muted);
      setPending(false);
    }
  }, []);
  const togglePlayMusic = useCallback(() => {
    const audio = player.current;
    const id = ++requestId.current;
    setError(null);
    if (!audio) {
      setError('Sound unavailable. Try again.');
      return;
    }
    if (requested.current || !audio.paused) {
      requested.current = false;
      audio.pause();
      audio.muted = true;
      setPlaying(false);
      setPending(false);
      return;
    }
    requested.current = true;
    setPending(true);
    audio.volume = 0.2;
    audio.muted = false;
    // Called in the actual header activation, not a mount/navigation effect.
    void audio
      .play()
      .then(() => {
        if (id !== requestId.current) return;
        setPending(false);
        setPlaying(!audio.paused && !audio.muted);
      })
      .catch(() => {
        if (id !== requestId.current) return;
        requested.current = false;
        audio.pause();
        audio.muted = true;
        setPlaying(false);
        setPending(false);
        setError('Sound unavailable. Try again.');
      });
  }, []);
  return (
    <PlayMusicContext.Provider
      value={{ playMusic, pending, audioError, togglePlayMusic, registerPlayer, syncPlayback }}
    >
      {children}
    </PlayMusicContext.Provider>
  );
}
export const useChangeMusic = () => useContext(PlayMusicContext);
