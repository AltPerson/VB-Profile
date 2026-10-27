'use client';

import { AnimatePresence, useReducedMotion } from 'motion/react';
import * as motion from 'motion/react-m';
import { CSSProperties, useEffect, useId, useMemo, useRef, useState } from 'react';
import SkillTile from './SkillTile';
import { CategoryIcon } from './skills-icons';
import {
  categories,
  CategoryId,
  categorySkills,
  getSkills,
  skillEase,
  skillsCopy,
} from './skills-taxonomy';

export default function SkillsMatrix() {
  const [selected, setSelected] = useState<CategoryId>('core-frontend');
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState(false);
  const [compact, setCompact] = useState(false);
  const [listElement, setListElement] = useState<HTMLDivElement | null>(null);
  const [listScrollable, setListScrollable] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  // Keep server and first client render identical; apply the media preference after hydration.
  const [reduced, setReduced] = useState(false);
  const search = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const nav = useRef<HTMLElement>(null);
  const overviewScroll = useRef(0);
  const needsFocus = useRef(false);
  const panelId = useId();
  const copy = skillsCopy;
  const skills = useMemo(() => getSkills(), []);
  const active = categories.find((category) => category.id === selected)!;
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const searching = normalizedQuery.length > 0;
  const visibleSkills = searching
    ? skills.filter((skill) => skill.label.toLocaleLowerCase().includes(normalizedQuery))
    : categorySkills(selected, skills);
  const showPanel = searching || !compact || detail;

  useEffect(() => setReduced(!!prefersReducedMotion), [prefersReducedMotion]);

  useEffect(() => {
    if (!listElement) return;
    const measure = () =>
      setListScrollable(listElement.scrollHeight > listElement.clientHeight + 1);
    const observer = new ResizeObserver(measure);
    observer.observe(listElement);
    measure();
    return () => observer.disconnect();
  }, [listElement, normalizedQuery]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 992px)');
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!needsFocus.current || !compact || !detail || searching) return;
    const frame = requestAnimationFrame(() => {
      if (heading.current) {
        heading.current.focus({ preventScroll: true });
        needsFocus.current = false;
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [compact, detail, selected, searching]);

  function selectCategory(id: CategoryId, button: HTMLButtonElement) {
    setSelected(id);
    if (compact) {
      overviewScroll.current = button.closest('main')?.scrollTop ?? 0;
      needsFocus.current = !searching;
      setDetail(true);
      const main = button.closest('main');
      if (main) main.scrollTop = 0;
    } else {
      // Scroll only the rail, never the shared page or its header.
      const rail = nav.current;
      if (rail && getComputedStyle(rail).overflowX === 'auto') {
        const r = rail.getBoundingClientRect(),
          b = button.getBoundingClientRect();
        if (b.left < r.left || b.right > r.right)
          rail.scrollTo({
            left: rail.scrollLeft + b.left - r.left - (r.width - b.width) / 2,
            behavior: reduced ? 'instant' : 'smooth',
          });
      }
    }
  }
  function back() {
    setDetail(false);
    requestAnimationFrame(() => {
      const button = nav.current?.querySelector<HTMLButtonElement>(`[data-category="${selected}"]`);
      button?.focus({ preventScroll: true });
      const main = button?.closest('main');
      if (main) main.scrollTop = overviewScroll.current;
    });
  }
  function clear() {
    setQuery('');
    search.current?.focus({ preventScroll: true });
  }

  return (
    <div
      className="skills-matrix__content after-typing"
      data-view={searching ? 'search' : detail ? 'category' : 'overview'}
    >
      <div className="skills-matrix__toolbar">
        <div className="skills-matrix__search">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="6" />
            <path d="m15 15 6 6" />
          </svg>
          <label className="skills-matrix__sr" htmlFor={`${panelId}-search`}>
            {copy.search}
          </label>
          <input
            ref={search}
            id={`${panelId}-search`}
            type="search"
            placeholder={copy.search}
            value={query}
            aria-controls={showPanel ? panelId : undefined}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && query) {
                event.preventDefault();
                clear();
              }
            }}
          />
          {query && (
            <button
              type="button"
              className="skills-matrix__clear"
              onClick={clear}
              aria-label={copy.clear}
            >
              ×
            </button>
          )}
        </div>
        <div className="skills-matrix__total">
          <strong>{skills.length}</strong>
          <span>{copy.technologies}</span>
          <svg viewBox="0 0 80 20" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M0 13h8l8-8 12 13 12-15 10 9 8-5 12 7h10" />
          </svg>
        </div>
      </div>
      <nav
        className={`skills-matrix__categories ${compact && (detail || searching) ? 'skills-matrix__categories--hidden' : ''}`}
        ref={nav}
        aria-label={copy.categories}
      >
        {categories.map((category, index) => {
          const count = categorySkills(category.id, skills).length;
          return (
            <button
              type="button"
              key={category.id}
              data-category={category.id}
              className="skills-matrix__category"
              style={
                {
                  '--category-accent': category.accent,
                  '--category-enter-delay': `${60 + index * 35}ms`,
                } as CSSProperties
              }
              aria-pressed={(!compact || detail) && selected === category.id}
              onClick={(event) => selectCategory(category.id, event.currentTarget)}
            >
              <span className="skills-matrix__category-icon">
                <CategoryIcon id={category.id} />
              </span>
              <span className="skills-matrix__category-label">{category.label}</span>
              <span className="skills-matrix__category-count">
                {String(count).padStart(2, '0')}
                <span aria-hidden="true"> ↗</span>
              </span>
              <span className="skills-matrix__category-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </nav>
      {compact && detail && !searching && (
        <button type="button" className="skills-matrix__back" onClick={back}>
          <span aria-hidden="true">←</span> {copy.back}
        </button>
      )}
      {showPanel && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            id={panelId}
            key={searching ? 'search' : selected}
            className="skills-matrix__panel"
            aria-labelledby={`${panelId}-heading`}
            initial={reduced ? false : { opacity: 0, y: searching ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : searching ? 0.12 : 0.22, ease: skillEase }}
            onAnimationComplete={() => {
              if (needsFocus.current && compact && !searching) {
                heading.current?.focus({ preventScroll: true });
                needsFocus.current = false;
              }
            }}
          >
            <div className="skills-matrix__panel-header">
              <div className="skills-matrix__panel-title">
                <span className="skills-matrix__panel-index" aria-hidden="true">
                  {searching ? '⌕' : String(categories.indexOf(active) + 1).padStart(2, '0')}
                </span>
                <h2 id={`${panelId}-heading`} ref={heading} tabIndex={-1}>
                  {searching ? copy.results : active.label}
                </h2>
                <span className="skills-matrix__panel-count">
                  {visibleSkills.length} <span>{copy.technologies}</span>
                </span>
              </div>
              <p>{searching ? copy.all : active.description}</p>
            </div>
            <div
              className="skills-matrix__list"
              ref={setListElement}
              tabIndex={listScrollable ? 0 : -1}
              role="region"
              aria-label={`${searching ? copy.results : active.label} — ${copy.technologies}`}
            >
              {visibleSkills.length ? (
                <ul className="skills-matrix__tiles">
                  {visibleSkills.map((skill, index) => (
                    <SkillTile
                      key={skill.id}
                      skill={skill}
                      index={index}
                      reduced={reduced}
                      searching={searching}
                      categoryLabel={
                        searching
                          ? categories.find((category) => category.id === skill.categoryId)!.label
                          : undefined
                      }
                    />
                  ))}
                </ul>
              ) : (
                <div className="skills-matrix__empty">
                  <span aria-hidden="true">⌕</span>
                  <h5>{copy.empty}</h5>
                  <p>{copy.emptyHint}</p>
                  <button type="button" onClick={clear}>
                    {copy.clear} ↗
                  </button>
                </div>
              )}
            </div>
          </motion.section>
        </AnimatePresence>
      )}
      <span className="skills-matrix__sr" role="status" aria-live="polite" aria-atomic="true">
        {searching
          ? `${copy.results}: ${visibleSkills.length}`
          : !compact || detail
            ? `${active.label}: ${visibleSkills.length}`
            : copy.categories}
      </span>
    </div>
  );
}
