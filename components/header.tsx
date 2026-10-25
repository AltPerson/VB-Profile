'use client';
import { links } from '@/constants';
import { linksData } from '@/constants/portfolio-data';
import { useChangeMusic } from '@/contexts/play-music-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './header.css';

export default function Header() {
  const pathname = usePathname();
  const { playMusic, pending, audioError, togglePlayMusic } = useChangeMusic();
  const action = playMusic || pending ? 'Turn sound off' : 'Turn sound on';
  return (
    <header className="header-block site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="logo-title" aria-label="VB Home">
          VB
        </Link>
        <ul className="site-nav__links">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className="link-text hover-opacity"
                aria-current={pathname === link.path ? 'page' : undefined}
              >
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
            aria-label={action}
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
