'use client';

import { useEffect, useRef, useState } from 'react';
import './animated-city.css';

/** The original city loop, streamed as muted video over its exact first-frame poster. */
export default function AnimatedCity({ mobileOnly = false }: { mobileOnly?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 992px)');
    const update = () => setAllowed(!motion.matches && (!mobileOnly || mobile.matches));
    const visibility = () => setTabVisible(!document.hidden);
    update();
    visibility();
    motion.addEventListener('change', update);
    mobile.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setSeen(true);
    });
    if (host.current) observer.observe(host.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', update);
      mobile.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [mobileOnly]);

  const source = allowed && seen && !failed ? '/assets/animations/city.webm' : undefined;
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    if (source && visible && tabVisible) void node.play().catch(() => {});
    else node.pause();
  }, [source, visible, tabVisible]);

  return (
    <div
      ref={host}
      className="city-animation"
      aria-hidden="true"
      data-ready={allowed && (ready || failed)}
      data-fallback={failed}
    >
      <video
        ref={video}
        src={source}
        muted
        autoPlay
        loop
        playsInline
        preload="none"
        poster="/assets/images/city-poster.webp"
        tabIndex={-1}
        onLoadedData={() => setReady(true)}
        onError={() => setFailed(true)}
      />
      <div className="city-animation__lighting" />
    </div>
  );
}
