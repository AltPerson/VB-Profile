// components/CreditsContent.tsx
import Link from 'next/link';

export function CreditsContent() {
  const FIGMA_URL =
    'https://www.figma.com/community/file/1243581032464465032/portfolio-cyberpunk-dev';
  const CC_BY_URL = 'https://creativecommons.org/licenses/by/4.0/';
  const FONT_LICENCE = 'https://openfontlicense.org';
  const AUTHOR = 'Lorrayne Goncalves';

  return (
    <div className="space-y-2 text-sm leading-relaxed text-white font-rajdhani">
      <div>
        <span className="text-gray-400">Title:</span> “portfolio cyberpunk – dev”
      </div>
      <div>
        <span className="text-gray-400">Author:</span> {AUTHOR}
      </div>
      <div>
        <span className="text-gray-400">Source:</span>{' '}
        <Link
          href={FIGMA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-4"
        >
          Figma Community (official)
        </Link>
      </div>
      <div>
        <span className="text-gray-400">License:</span>{' '}
        <Link
          href={CC_BY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-4"
        >
          CC BY 4.0
        </Link>
      </div>
      <div>
        <span className="text-gray-400">Changes:</span> Web adaptation, layout, animations,
        typography.
      </div>

      <div>
        <span className="text-gray-400">Assets:</span>{' '}
        <Link
          href={FONT_LICENCE}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-4"
        >
          Fonts: Rajdhani, Tomorrow — SIL OFL 1.1.
        </Link>
      </div>

      <div>
        <span className="text-gray-400">Last updated:</span> {new Date().toISOString().slice(0, 10)}
      </div>
    </div>
  );
}
