import { IProject } from '@/constants/portfolio-data';
import { motion, useReducedMotion } from 'motion/react';
import { DeckCopy, twoDigits } from './deck-copy';

interface Props {
  projects: IProject[];
  copy: DeckCopy;
  selected: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}
export function DeckArrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d={direction === 'left' ? 'M15 4 7 12l8 8' : 'm9 4 8 8-8 8'} />
    </svg>
  );
}
export default function ProjectDeckControls({
  projects,
  copy,
  selected,
  onPrevious,
  onNext,
  onSelect,
}: Props) {
  const reducedMotion = useReducedMotion();
  return (
    <nav className="projects-deck__navigation" aria-label={copy.carousel}>
      <motion.button
        className="projects-deck__nav-button"
        tabIndex={0}
        type="button"
        aria-label={copy.previousLabel}
        onClick={onPrevious}
        whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      >
        <DeckArrow direction="left" />
        <span>{copy.previous}</span>
      </motion.button>
      <div className="projects-deck__rail">
        <div className="projects-deck__nodes">
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.link}
              className={`projects-deck__node ${selected === index ? 'is-current' : ''}`}
              aria-label={`${copy.goTo} ${index + 1} ${copy.of} ${projects.length}: ${project.title}`}
              aria-current={selected === index ? 'true' : undefined}
              onClick={() => onSelect(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <span className="projects-deck__counter" aria-hidden="true">
          {twoDigits(selected + 1)} <span>/ {twoDigits(projects.length)}</span>
        </span>
      </div>
      <motion.button
        className="projects-deck__nav-button"
        tabIndex={0}
        type="button"
        aria-label={copy.nextLabel}
        onClick={onNext}
        whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      >
        <span>{copy.next}</span>
        <DeckArrow direction="right" />
      </motion.button>
    </nav>
  );
}
