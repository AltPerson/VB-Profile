'use client';

import { IProject } from '@/constants/portfolio-data';
import useEmblaCarousel from 'embla-carousel-react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import ProjectDeckCard from './ProjectDeckCard';
import ProjectDeckControls from './ProjectDeckControls';
import { DeckCopy } from './deck-copy';

interface Props {
  projects: IProject[];
  copy: DeckCopy;
}

export default function ProjectsDataDeck({ projects, copy }: Props) {
  const prefersReducedMotion = useReducedMotion();
  // Keep server and first client markup identical, including the scan element.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const reducedMotion = hydrated && !!prefersReducedMotion;
  const [viewportRef, api] = useEmblaCarousel({
    align: 'center',
    loop: true,
    dragFree: false,
    skipSnaps: false,
    slidesToScroll: 1,
    containScroll: false,
    watchFocus: false,
    duration: reducedMotion ? 0 : 25,
  });
  const [selected, setSelected] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([]);
  const selectedRef = useRef(0);
  const [stackIndex, setStackIndex] = useState<number | null>(null);
  const stackButton = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    if (!api) return;
    const syncVisible = () => {
      const visible = api.slidesInView();
      setVisibleSlides((current) => (current.join(',') === visible.join(',') ? current : visible));
    };
    const sync = () => {
      const next = api.selectedScrollSnap();
      if (selectedRef.current !== next) {
        const oldSlide = api.slideNodes()[selectedRef.current];
        if (oldSlide?.contains(document.activeElement))
          api.rootNode().focus({ preventScroll: true });
        setStackIndex(null);
      }
      selectedRef.current = next;
      setSelected(next);
    };
    sync();
    syncVisible();
    api.on('select', sync).on('reInit', sync).on('slidesInView', syncVisible);
    return () => {
      api.off('select', sync).off('reInit', sync).off('slidesInView', syncVisible);
    };
  }, [api]);

  const goTo = useCallback(
    (index: number) => api?.scrollTo(index, !!reducedMotion),
    [api, reducedMotion],
  );
  const previous = useCallback(() => api?.scrollPrev(!!reducedMotion), [api, reducedMotion]);
  const next = useCallback(() => api?.scrollNext(!!reducedMotion), [api, reducedMotion]);
  const toggleStack = () => {
    setStackIndex((current) => (current === selected ? null : selected));
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === 'Escape' && stackIndex !== null) {
      stackButton.current?.focus({ preventScroll: true });
      setStackIndex(null);
      event.preventDefault();
    } else if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      if (
        ['Home', 'End'].includes(event.key) &&
        target.closest('.projects-deck__description, .projects-deck__disclosure')
      )
        return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'Home') goTo(0);
      if (event.key === 'End') goTo(projects.length - 1);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="projects-deck__carousel after-typing"
        aria-label={copy.carousel}
        aria-roledescription="carousel"
        onKeyDown={onKeyDown}
      >
        <div className="projects-deck__stage">
          <div
            className="projects-deck__viewport"
            ref={viewportRef}
            tabIndex={0}
            role="group"
            aria-label={copy.carousel}
            onDragStartCapture={(event) => event.preventDefault()}
            onPointerDownCapture={(event) => {
              pointerStart.current = { x: event.clientX, y: event.clientY };
              dragged.current = false;
            }}
            onPointerMoveCapture={(event) => {
              const start = pointerStart.current;
              if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6)
                dragged.current = true;
            }}
            onPointerUpCapture={() => {
              pointerStart.current = null;
            }}
            onPointerCancelCapture={() => {
              pointerStart.current = null;
            }}
            onClickCapture={(event) => {
              if (dragged.current && event.detail > 0) {
                event.preventDefault();
                event.stopPropagation();
                dragged.current = false;
              }
            }}
          >
            <div className="projects-deck__track">
              {projects.map((project, index) => (
                <div className="projects-deck__slide" key={project.link}>
                  <ProjectDeckCard
                    project={project}
                    index={index}
                    count={projects.length}
                    copy={copy}
                    active={selected === index}
                    neighbor={
                      visibleSlides.includes(index) &&
                      (index === (selected + 1) % projects.length ||
                        index === (selected + projects.length - 1) % projects.length)
                    }
                    stackOpen={stackIndex === index}
                    reducedMotion={!!reducedMotion}
                    stackButtonRef={selected === index ? stackButton : undefined}
                    onSelect={() => goTo(index)}
                    onToggleStack={toggleStack}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <ProjectDeckControls
          projects={projects}
          copy={copy}
          selected={selected}
          onPrevious={previous}
          onNext={next}
          onSelect={goTo}
        />
        <span className="projects-deck__sr-only" aria-live="polite" aria-atomic="true">
          {copy.project} {selected + 1} {copy.of} {projects.length}: {projects[selected].title}
        </span>
      </section>
    </MotionConfig>
  );
}
