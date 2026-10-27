import { IProject } from '@/constants/portfolio-data';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { RefObject, useEffect, useId, useRef, useState } from 'react';
import { DeckCopy, deckEase, twoDigits } from './deck-copy';
import { projectMedia, projectVideo } from './project-media';
import ProjectMediaVideo from './ProjectMediaVideo';
interface Props {
  project: IProject;
  index: number;
  count: number;
  copy: DeckCopy;
  active: boolean;
  neighbor: boolean;
  stackOpen: boolean;
  reducedMotion: boolean;
  mediaReady: boolean;
  stackButtonRef?: RefObject<HTMLButtonElement>;
  onSelect: () => void;
  onToggleStack: () => void;
}
export default function ProjectDeckCard({
  project,
  index,
  count,
  copy,
  active,
  neighbor,
  stackOpen,
  reducedMotion,
  mediaReady,
  stackButtonRef,
  onSelect,
  onToggleStack,
}: Props) {
  const id = useId();
  const frame = useRef<HTMLDivElement>(null);
  const description = useRef<HTMLParagraphElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const animated = mediaReady && (active || neighbor) && !reducedMotion;
  const videoSource = videoFailed ? undefined : projectVideo(project);
  useEffect(() => {
    frame.current?.toggleAttribute('inert', !active);
  }, [active]);
  useEffect(() => {
    const node = description.current;
    if (!node) return;
    node.scrollTop = 0;
    const measure = () => setScrollable(node.scrollHeight > node.clientHeight + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    measure();
    return () => observer.disconnect();
  }, [project.description, active]);
  return (
    <motion.div
      className={`projects-deck__card ${active ? 'is-active' : 'is-inactive'}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${copy.project} ${index + 1} ${copy.of} ${count}: ${project.title}`}
      initial={false}
      animate={{ scale: reducedMotion ? 1 : active ? 1 : 0.9, opacity: active ? 1 : 0.48 }}
      transition={{ duration: reducedMotion ? 0 : 0.38, ease: deckEase }}
    >
      <div className="projects-deck__card-frame" ref={frame} aria-hidden={!active}>
        <div
          className={`projects-deck__media projects-deck__media--${project.bgName}`}
          style={{
            backgroundImage: reducedMotion
              ? undefined
              : `url('${projectMedia(project, animated && !videoSource)}')`,
          }}
        >
          {animated && videoSource && (
            <ProjectMediaVideo
              src={videoSource}
              poster={projectMedia(project, false)}
              onFailure={() => setVideoFailed(true)}
            />
          )}
          <div className="projects-deck__metadata">
            <span>
              {copy.project.toUpperCase()} {twoDigits(index + 1)}{' '}
              <span className="projects-deck__metadata-total">/ {twoDigits(count)}</span>
            </span>
            <span className="projects-deck__category">{copy.category}</span>
          </div>
          <span className="projects-deck__media-coordinate" aria-hidden="true">
            {twoDigits(index + 1)} — VB / {copy.archive}
          </span>
        </div>
        <div className="projects-deck__card-body">
          <h2 className="projects-deck__title">{project.title}</h2>
          <p
            ref={description}
            className="projects-deck__description"
            tabIndex={active && scrollable ? 0 : -1}
            role={scrollable ? 'region' : undefined}
            aria-label={scrollable ? `${copy.description}: ${project.title}` : undefined}
          >
            {project.description}
          </p>
          <div id={`${id}-stack`} className="projects-deck__stack-slot">
            <AnimatePresence initial={false}>
              {active && stackOpen && (
                <motion.div
                  className="projects-deck__disclosure"
                  tabIndex={0}
                  role="region"
                  aria-label={`${copy.stack}: ${project.title}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
                  transition={{ duration: reducedMotion ? 0 : 0.22, ease: deckEase }}
                >
                  <ul className="projects-deck__chips" aria-label={copy.stack}>
                    {project.technologies.map((tech, techIndex) => (
                      <motion.li
                        key={tech}
                        className="projects-deck__chip"
                        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reducedMotion ? 0 : 0.18,
                          delay: reducedMotion ? 0 : Math.min(techIndex, 4) * 0.03,
                        }}
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="projects-deck__actions">
          <a
            className="projects-deck__action projects-deck__action--live"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={active ? 0 : -1}
            aria-label={`${copy.liveLabel} ${project.title}`}
          >
            {copy.liveDemo}
            <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={stackButtonRef}
            className="projects-deck__action"
            type="button"
            tabIndex={active ? 0 : -1}
            aria-expanded={active && stackOpen}
            aria-controls={`${id}-stack`}
            onClick={onToggleStack}
          >
            <span aria-hidden="true">{stackOpen ? '−' : '+'}</span>
            {copy.stack}
          </button>
        </div>
      </div>
      {!active && (
        <button
          className="projects-deck__preview"
          type="button"
          tabIndex={neighbor ? 0 : -1}
          aria-label={`${copy.preview} ${index + 1}: ${project.title}`}
          onClick={onSelect}
        >
          <span aria-hidden="true">{copy.preview} ↗</span>
        </button>
      )}
    </motion.div>
  );
}
