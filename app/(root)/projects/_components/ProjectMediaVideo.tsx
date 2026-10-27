import { useEffect, useRef } from 'react';

export default function ProjectMediaVideo({
  src,
  poster,
  onFailure,
}: {
  src: string;
  poster: string;
  onFailure: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const sync = () => {
      if (document.hidden) node.pause();
      else void node.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      document.removeEventListener('visibilitychange', sync);
      node.pause();
    };
  }, [src]);
  return (
    <video
      ref={video}
      className="projects-deck__media-video"
      src={src}
      poster={poster}
      muted
      autoPlay
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onError={onFailure}
    />
  );
}
