import { CSSProperties, useEffect, useRef, useState } from 'react';
import { personalCopy } from './personal-terminal-copy';
import { commandGroups, commandRegistry, nodeCommands } from './terminal-data';
import { requestNodeCommand, useTerminalSession } from './useTerminalSession';

const geometry = {
  identity: { x: 38, y: 29, short: 'ID' },
  files: { x: 182, y: 29, short: 'FILE' },
  development: { x: 38, y: 115, short: 'DEV' },
  system: { x: 182, y: 115, short: 'SYS' },
};

// A projection of completed, successful transcript entries, never a second event logger.
export default function SignalNetwork({
  session,
  reduced,
}: {
  session: ReturnType<typeof useTerminalSession>;
  reduced: boolean;
}) {
  const copy = personalCopy,
    ready = session.phase === 'ready';
  const [lowPower, setLowPower] = useState(false);
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    setLowPower(navigator.hardwareConcurrency <= 2 || !!connection?.saveData);
  }, []);
  const events = session.entries
    .filter(
      (entry) =>
        entry.generation === session.run &&
        entry.revealed &&
        entry.command !== 'error' &&
        session.phase !== 'boot' &&
        session.phase !== 'boot-exit',
    )
    .slice(-10);
  const latest = events.at(-1);
  const seen = useRef(latest?.id);
  const [pulseId, setPulseId] = useState<number | null>(null);
  useEffect(() => {
    const changed = seen.current !== latest?.id;
    seen.current = latest?.id;
    if (reduced || lowPower) setPulseId(null);
    else if (changed) setPulseId(latest?.id ?? null);
  }, [latest?.id, reduced, lowPower, session.run]);
  const active =
    latest && latest.command !== 'error' ? commandRegistry[latest.command].group : null;
  return (
    <section
      className="signal-network"
      aria-label={copy.network.title}
      data-active-group={active ?? 'idle'}
      data-enabled={ready}
      data-motion={reduced || lowPower ? 'static' : 'signal'}
    >
      <div className="signal-network__heading">
        <h2>{copy.network.title}</h2>
        <span>{ready ? copy.network.ready : copy.network.waiting}</span>
      </div>
      <div className="signal-network__map">
        <svg
          className="signal-network__paths"
          viewBox="0 0 220 143"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {commandGroups.map((group) => {
            const { x, y } = geometry[group];
            return (
              <g key={group} data-group={group} data-active={group === active}>
                <path d={`M110 66 L${x} ${y}`} />
                {group === active && latest && pulseId === latest.id && !reduced && !lowPower && (
                  <circle
                    key={latest.id}
                    className="signal-network__pulse"
                    r="3"
                    cx="110"
                    cy="66"
                    style={
                      { '--signal-x': `${x - 110}px`, '--signal-y': `${y - 66}px` } as CSSProperties
                    }
                  />
                )}
              </g>
            );
          })}
        </svg>
        <span className="signal-network__core" aria-hidden="true">
          VB
        </span>
        {commandGroups.map((group) => {
          const { x, y, short } = geometry[group],
            command = nodeCommands[group];
          const label = copy.labels[group];
          return (
            <button
              key={group}
              type="button"
              className="signal-network__node"
              data-group={group}
              data-active={active === group}
              disabled={!ready || session.nodeTyping}
              aria-busy={session.nodeTyping}
              aria-label={`${short} ${label} · ${command} — ${copy.network.run} ${command} (${copy.network.node})`}
              style={
                {
                  '--node-x': `${(x / 220) * 100}%`,
                  '--node-y': `${(y / 143) * 100}%`,
                } as CSSProperties
              }
              onClick={() => {
                requestNodeCommand(command, reduced);
              }}
            >
              <span className="signal-network__dot" aria-hidden="true">
                {short}
              </span>
              <span className="signal-network__detail" aria-hidden="true">
                {label} · {command}
              </span>
            </button>
          );
        })}
      </div>
      <ol className="signal-network__events" aria-label={copy.network.activity}>
        {events.map((entry) => (
          <li
            key={entry.id}
            data-signal-id={entry.id}
            data-group={
              entry.command === 'error' ? undefined : commandRegistry[entry.command].group
            }
          >
            <span className="personal-terminal__sr">{entry.input}</span>
          </li>
        ))}
      </ol>
      <p className="signal-network__last">
        <span>LAST SIGNAL</span>
        <strong data-group={active ?? undefined}>
          <i aria-hidden="true" />
          {latest ? active?.toUpperCase() : 'AWAITING SIGNAL'}
        </strong>
      </p>
    </section>
  );
}
