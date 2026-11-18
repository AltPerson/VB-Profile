'use client';
import { links } from '@/constants';
import { linksData } from '@/constants/portfolio-data';
import { useChangeMusic } from '@/contexts/play-music-context';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type MouseEvent, type PointerEvent, useEffect, useState, useTransition } from 'react';
import './header.css';

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [prefetchVisibleLinks, setPrefetchVisibleLinks] = useState(false);
  const [pendingHref, setPendingHref] = useState<string>();
  const [isNavigating, startNavigation] = useTransition();
  const { playMusic, pending, audioError, togglePlayMusic } = useChangeMusic();
  const action = playMusic || pending ? 'Turn sound off' : 'Turn sound on';

  useEffect(() => {
    let cancelScheduledPrefetch: (() => void) | undefined;

    function enablePrefetch() {
      const connection = (navigator as NavigatorWithConnection).connection;
      if (!connection?.saveData && !connection?.effectiveType?.endsWith('2g')) {
        setPrefetchVisibleLinks(true);
      }
    }

    function schedulePrefetch() {
      if (typeof window.requestIdleCallback === 'function') {
        const idleId = window.requestIdleCallback(enablePrefetch, { timeout: 1000 });
        cancelScheduledPrefetch = () => window.cancelIdleCallback(idleId);
      } else {
        const timer = window.setTimeout(enablePrefetch, 0);
        cancelScheduledPrefetch = () => window.clearTimeout(timer);
      }
    }

    if (document.readyState === 'complete') schedulePrefetch();
    else window.addEventListener('load', schedulePrefetch, { once: true });

    return () => {
      window.removeEventListener('load', schedulePrefetch);
      cancelScheduledPrefetch?.();
    };
  }, []);

  function routeProps(href: string) {
    const isCurrent = pathname === href;
    const autoPrefetch = prefetchVisibleLinks && !isCurrent;

    function prefetchOnIntent() {
      if (!autoPrefetch && !isCurrent) router.prefetch(href);
    }

    function navigate(event: MouseEvent<HTMLAnchorElement>) {
      const target = event.currentTarget.target;
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (target && target !== '_self') ||
        event.currentTarget.hasAttribute('download') ||
        (isCurrent && !isNavigating)
      ) {
        return;
      }

      event.preventDefault();
      setPendingHref(href);
      startNavigation(() => router.push(href));
    }

    return {
      href,
      prefetch: autoPrefetch ? undefined : false,
      onMouseEnter: prefetchOnIntent,
      onFocus: prefetchOnIntent,
      onPointerDown: (event: PointerEvent<HTMLAnchorElement>) => {
        if (event.isPrimary && event.pointerType !== 'mouse') prefetchOnIntent();
      },
      onClick: navigate,
      'aria-current': isCurrent ? ('page' as const) : undefined,
      'data-navigation-pending':
        !isCurrent && isNavigating && pendingHref === href ? true : undefined,
    };
  }

  return (
    <header className="header-block site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link {...routeProps('/')} className="logo-title site-nav__brand" aria-label="VB Home">
          VB
          <span className="site-nav__brand-accent" aria-hidden="true">
            _
          </span>
        </Link>
        <ul className="site-nav__links">
          {links.map((link) => (
            <li key={link.path}>
              <Link {...routeProps(link.path)} className="link-text site-nav__link">
                {linksData[link.label]}
              </Link>
            </li>
          ))}
        </ul>
        <div className="site-nav__sound">
          <button
            type="button"
            className="sound-control"
            onClick={togglePlayMusic}
            aria-label={`${playMusic ? 'Sound On' : 'Sound Off'} — ${action}`}
            aria-pressed={playMusic}
            aria-busy={pending}
            aria-describedby={audioError ? 'sound-status' : undefined}
            title={audioError ?? action}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              {playMusic ? (
                <>
                  <path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />
                </>
              ) : (
                <path d="m16 9 6 6m0-6-6 6" />
              )}
            </svg>
            <span>{playMusic ? 'Sound On' : 'Sound Off'}</span>
          </button>
          <span id="sound-status" className="sound-status" role="status">
            {audioError}
          </span>
        </div>
      </nav>
    </header>
  );
}
