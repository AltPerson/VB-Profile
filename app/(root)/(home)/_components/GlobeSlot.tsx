'use client';
import dynamic from 'next/dynamic';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
const Scene = dynamic(() => import('./Globe3D'), { ssr: false, loading: () => null });
function GlobeSlot({ reduced }: { reduced: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false),
    [tabVisible, setTabVisible] = useState(true),
    [eligible, setEligible] = useState<boolean | null>(null),
    [idle, setIdle] = useState(false),
    [failed, setFailed] = useState(false),
    [ready, setReady] = useState(false);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '0px',
    });
    observer.observe(node);
    const media = window.matchMedia('(min-width: 320px)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection;
      setEligible(
        media.matches &&
          navigator.hardwareConcurrency > 2 &&
          !connection?.saveData &&
          !motion.matches,
      );
    };
    const visibility = () => setTabVisible(!document.hidden);
    update();
    visibility();
    media.addEventListener('change', update);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  useEffect(() => {
    if (!visible || reduced || !eligible) return;
    const timer = window.setTimeout(() => setIdle(true), 250);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, eligible]);
  const onReady = useCallback(() => setReady(true), []),
    onFailure = useCallback(() => {
      setFailed(true);
      setReady(false);
    }, []);
  const mount = idle && eligible === true && !reduced && !failed;
  const staticMode = reduced || eligible === false || failed;
  const active = visible && tabVisible && !reduced;
  return (
    <div
      ref={host}
      className="personal-terminal__globe-slot"
      data-renderer={mount && ready ? '3d' : staticMode ? 'svg' : 'loading'}
      data-active={active}
      data-static={staticMode}
      aria-hidden="true"
    >
      <div className="personal-terminal__earth-static" />
      <div className="personal-terminal__scanner">
        <svg viewBox="0 0 240 240" fill="none" focusable="false">
          <circle cx="120" cy="120" r="85" stroke="currentColor" strokeOpacity=".15" />
          <circle
            cx="120"
            cy="120"
            r="66"
            stroke="currentColor"
            strokeOpacity=".12"
            strokeDasharray="2 9"
          />
          <path
            d="M23 65V23h42M175 23h42v42M217 175v42h-42M65 217H23v-42"
            stroke="currentColor"
            strokeOpacity=".35"
          />
          <g className="personal-terminal__scanner-sweep">
            <path d="M120 35a85 85 0 0 1 85 85" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="205" cy="120" r="2" fill="currentColor" />
          </g>
          <path d="M111 120h18M120 111v18" stroke="currentColor" strokeOpacity=".45" />
        </svg>
      </div>
      {mount && <Scene active={active} onReady={onReady} onFailure={onFailure} />}
    </div>
  );
}
export default memo(GlobeSlot);
