import { useEffect, useState } from 'react';
import { personalCopy } from './personal-terminal-copy';

export default function TerminalClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = window.setInterval(update, 1000);
    const refresh = () => {
      if (!document.hidden) update();
    };
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  const time =
    now?.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }) ?? '--:--:--';
  const date =
    now?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) ?? '—';
  const zone = now
    ? (new Intl.DateTimeFormat('en', { timeZoneName: 'shortOffset' })
        .formatToParts(now)
        .find((part) => part.type === 'timeZoneName')
        ?.value.replace('GMT', 'UTC') ?? 'UTC')
    : '—';
  return (
    <div className="personal-terminal__utility-time" aria-live="off">
      <time
        className="personal-terminal__clock"
        dateTime={now?.toISOString()}
        aria-label={`${personalCopy.localTime}: ${time}`}
        aria-live="off"
      >
        {time}
      </time>
      <span
        className="personal-terminal__local-date"
        data-local-date={
          now ? `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}` : undefined
        }
      >
        {date}
      </span>
      <span className="personal-terminal__utc-offset">{zone}</span>
    </div>
  );
}
