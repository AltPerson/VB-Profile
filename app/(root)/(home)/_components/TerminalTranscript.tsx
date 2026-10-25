import { useEffect, useRef } from 'react';
import { personalContent, personalCopy } from './personal-terminal-copy';
import { getTerminalData } from './terminal-data';
import TerminalCommandLine from './TerminalCommandLine';
import TerminalCommandOutput from './TerminalCommandOutput';
import { getTerminalSession, useTerminalSession } from './useTerminalSession';

let scrollTopInDocument = 0;
export default function TerminalTranscript({
  session,
  data,
}: {
  session: ReturnType<typeof useTerminalSession>;
  data: ReturnType<typeof getTerminalData>;
}) {
  const host = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const token =
    session.run + '/' + session.entries.map((entry) => entry.id + ':' + entry.revealed).join('|');
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    if (!mounted.current) {
      mounted.current = true;
      node.scrollTop = scrollTopInDocument;
      return;
    }
    const latest = getTerminalSession().entries.at(-1);
    if (!latest) {
      node.scrollTop = 0;
      scrollTopInDocument = 0;
      const main = node.closest('main');
      if (main) main.scrollTop = 0;
      return;
    }
    if (latest.origin !== 'manual') return;
    const frame = requestAnimationFrame(() => {
      if (getComputedStyle(node).overflowY === 'auto') {
        const entry = node.querySelector<HTMLElement>('[data-entry-id="' + latest.id + '"]');
        if (entry)
          node.scrollTop += entry.getBoundingClientRect().top - node.getBoundingClientRect().top;
      } else {
        const main = node.closest('main');
        if (main) main.scrollTop = main.scrollHeight;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [token]);
  const boot = session.phase === 'boot' || session.phase === 'boot-exit';
  const copy = personalCopy;
  return (
    <div
      ref={host}
      className="personal-terminal__transcript"
      role="region"
      aria-label={copy.output}
      tabIndex={0}
      onScroll={(event) => {
        scrollTopInDocument = event.currentTarget.scrollTop;
      }}
    >
      {boot ? (
        <div
          className="personal-terminal__boot-transcript"
          data-exiting={session.phase === 'boot-exit'}
        >
          {personalContent.boot.map((text, index) => (
            <TerminalCommandLine
              key={index}
              id={'boot' + index}
              text={text}
              count={session.bootCounts[index]}
              active={session.active === 'boot' + index}
            />
          ))}
          {session.bootReady && <p className="personal-terminal__boot-ready">{copy.bootReady}</p>}
        </div>
      ) : (
        <>
          {session.truncated && <p className="terminal-output-note">{copy.labels.limit}</p>}
          {session.entries.map((entry) => (
            <TerminalCommandOutput
              key={entry.id}
              entry={entry}
              active={session.active === entry.id}
              data={data}
            />
          ))}
        </>
      )}
    </div>
  );
}
