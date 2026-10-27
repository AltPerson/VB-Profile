'use client';

import DefaultLayout from '@/components/default-layout';
import { experienceData } from '@/constants/portfolio-data';
import { getExperienceYears } from '@/lib/utils/getExperience';
import { useEffect, useMemo, useState } from 'react';
import { personalCopy } from './personal-terminal-copy';
import './personal-terminal.css';
import SignalNetwork from './SignalNetwork';
import { getTerminalData } from './terminal-data';
import TerminalPrompt from './TerminalPrompt';
import TerminalTranscript from './TerminalTranscript';
import TerminalUtility from './TerminalUtility';
import { finishTerminal, useTerminalSession } from './useTerminalSession';
import { useTerminalViewport } from './useTerminalViewport';

export default function Content() {
  const [now, setNow] = useState<Date | null>(null),
    [reduced, setReduced] = useState(false);
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = window.setInterval(update, 60_000);
    const refresh = () => {
      if (!document.hidden) update();
    };
    document.addEventListener('visibilitychange', refresh);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => setReduced(media.matches);
    motion();
    media.addEventListener('change', motion);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
      media.removeEventListener('change', motion);
    };
  }, []);
  const years = now ? getExperienceYears(experienceData.workPlaces) : null;
  const data = useMemo(() => getTerminalData(years), [years]);
  const session = useTerminalSession(reduced),
    copy = personalCopy;
  const finish = () => finishTerminal();
  const viewport = useTerminalViewport(session.phase);
  const boot = session.phase === 'boot' || session.phase === 'boot-exit';
  return (
    <div
      className="personal-terminal home-personal-terminal"
      lang="en"
      ref={viewport.host}
      data-layout={viewport.layout}
      data-ready={session.phase === 'ready'}
      data-phase={session.phase}
      data-stage={session.active ?? session.phase}
      data-run={session.run}
      onKeyDownCapture={(event) => {
        if (event.key === 'Escape' && session.phase !== 'ready') finish();
      }}
    >
      <DefaultLayout>
        <section className="personal-terminal__window" aria-label="TERMINAL">
          <header className="personal-terminal__topbar">
            <span className="personal-terminal__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <h1 className="personal-terminal__label">TERMINAL</h1>
            <span className="personal-terminal__online" title={copy.online}>
              <i aria-hidden="true" />
              <span>{copy.online}</span>
            </span>
          </header>
          {session.phase !== 'ready' && (
            <button type="button" className="personal-terminal__skip" onClick={finish}>
              {copy.skip}
            </button>
          )}
          <div className="personal-terminal__canvas">
            {/* Boot output and command history occupy different layouts. Replace the boot
                viewport instead of moving its existing scroll region below the new HUD. */}
            <TerminalTranscript key={boot ? 'boot' : 'commands'} session={session} data={data} />
            <div className="personal-terminal__hud">
              <TerminalUtility reduced={reduced} />
              <SignalNetwork key={session.run} session={session} reduced={reduced} />
            </div>
            <div className="personal-terminal__prompt-slot">
              {(session.phase === 'ready' ||
                session.phase === 'utility' ||
                session.phase === 'auto-typing') && (
                <TerminalPrompt
                  reduced={reduced}
                  ready={session.phase === 'ready'}
                  session={session}
                />
              )}
            </div>
          </div>
          <span
            className="personal-terminal__sr"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {session.phase === 'ready' &&
              (session.announcement ? (
                <span key={session.entries.at(-1)?.id}>
                  {copy.completed + ': ' + session.announcement}
                </span>
              ) : (
                copy.readyAnnouncement
              ))}
          </span>
        </section>
      </DefaultLayout>
    </div>
  );
}
