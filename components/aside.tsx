'use client';
import { classNames } from '@/lib/utils/classnames';
import { AppRoutesEnum } from '@/types/enums';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import AnimatedCity from './animated-city';

const Aside = () => {
  const pathname = usePathname();
  const titlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = titlesRef.current;
    const frontend = container?.querySelector<HTMLElement>('.home-title-slide-down');
    const engineer = container?.querySelector<HTMLElement>('.home-title-slide-up');
    const front = frontend?.firstElementChild;
    const eng = engineer?.firstElementChild;
    if (!frontend || !engineer || !front?.firstChild || !eng?.firstChild) return;

    const firstLetter = document.createRange();
    firstLetter.setStart(front.firstChild, 0);
    firstLetter.setEnd(front.firstChild, 1);
    const lastRedLetter = document.createRange();
    const redLength = eng.firstChild.textContent?.length ?? 0;
    lastRedLetter.setStart(eng.firstChild, redLength - 1);
    lastRedLetter.setEnd(eng.firstChild, redLength);

    const alignHighlights = () => {
      const frontendRect = frontend.getBoundingClientRect();
      const engineerRect = engineer.getBoundingClientRect();
      const f = firstLetter.getBoundingClientRect();
      const g = lastRedLetter.getBoundingClientRect();
      // Use character positions within each word, independent of the entrance animation.
      const fOffset = (f.top + f.bottom) / 2 - frontendRect.top - frontendRect.height / 2;
      const gOffset = (g.top + g.bottom) / 2 - engineerRect.top - engineerRect.height / 2;
      const offset = -frontendRect.height * 0.44 + fOffset - gOffset;
      engineer.style.setProperty('--engineer-offset', `${offset}px`);
    };

    const observer = new ResizeObserver(alignHighlights);
    observer.observe(frontend);
    observer.observe(engineer);
    alignHighlights();
    return () => observer.disconnect();
  }, []);
  return (
    <aside className="flex-[1_0_50%] flex aside bg-black max-[992px]:hidden">
      <div className="flex-[1_0_50%] h-full text-white bg-black neon-wrapper-border aside-text flex items-center justify-center overflow-hidden">
        <div className="vertical-text-container" ref={titlesRef}>
          <h2 className="home-title home-title-slide-down">
            <span className="text-redlight pulsed-text">Front</span>
            <span className="pulsed-text-white">end</span>
          </h2>
          <h2 className="home-title home-title-slide-up">
            <span className="text-redlight pulsed-text">Eng</span>
            <span className="pulsed-text-white">ineer</span>
          </h2>
        </div>
      </div>
      <div
        className={classNames(
          `flex-[1_1_50%] h-full city-media-surface`,
          pathname === AppRoutesEnum.HOME ? 'central-bg-0' : '',
          pathname === AppRoutesEnum.EXPERIENCE ? 'central-bg-1' : '',
          pathname === AppRoutesEnum.PROJECTS ? 'central-bg-2' : '',
          pathname === AppRoutesEnum.SKILLS ? 'central-bg-3' : '',
          pathname === AppRoutesEnum.CONTACT ? 'central-bg-4' : '',
        )}
      >
        <AnimatedCity />
      </div>
    </aside>
  );
};

export default Aside;
