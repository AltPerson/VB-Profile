'use client';

import { useCallback, useEffect, useState } from 'react';

/** One entrance per route mount; local interactions never replay it. */
export function usePageEntrance(durationMs: number) {
  const [phase, setPhase] = useState<'pending' | 'entering' | 'complete'>('pending');
  const complete = useCallback(() => {
    setPhase((current) => (current === 'entering' ? 'complete' : current));
  }, []);
  const start = useCallback(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPhase((current) => (current === 'pending' ? (reduced ? 'complete' : 'entering') : current));
  }, []);

  useEffect(() => {
    if (phase !== 'entering') return;
    const timer = window.setTimeout(complete, durationMs);
    return () => window.clearTimeout(timer);
  }, [phase, durationMs, complete]);

  return {
    start,
    entranceProps: { 'data-entrance': phase, onFocusCapture: complete },
  };
}
