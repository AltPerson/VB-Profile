'use client';
import { IWorkPlace } from '@/constants/portfolio-data';
import { CSSProperties, useEffect, useId, useMemo, useRef, useState } from 'react';
import CareerIndex from './CareerIndex';
import DossierDetail from './DossierDetail';
import { createCareerRecords } from './dossier-data';

export default function ExperienceDossier({
  workPlaces,
  compact,
}: {
  workPlaces: IWorkPlace[];
  compact: boolean;
}) {
  const records = useMemo(() => createCareerRecords(workPlaces), [workPlaces]);
  const [selected, setSelected] = useState(0),
    [expanded, setExpanded] = useState(true),
    [direction, setDirection] = useState(1);
  const host = useRef<HTMLDivElement>(null),
    id = useId();
  const selectionFrame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(selectionFrame.current), []);
  if (!records.length) return <p className="after-typing">No career records available.</p>;
  const activeIndex = Math.min(selected, records.length - 1),
    active = records[activeIndex];
  function select(index: number) {
    if (index === activeIndex) return;
    cancelAnimationFrame(selectionFrame.current);
    setDirection(index > activeIndex ? 1 : -1);
    setSelected(index);
    setExpanded(true);
    selectionFrame.current = requestAnimationFrame(() => {
      const node = host.current;
      if (!node?.isConnected) return;
      node.querySelector<HTMLElement>('[role="tabpanel"]')?.scrollTo({ top: 0 });
      if (node.closest('.experience-dossier')?.getAttribute('data-layout') === 'natural') {
        const main = node.closest('main');
        if (main)
          main.scrollTop += node.getBoundingClientRect().top - main.getBoundingClientRect().top;
      }
    });
  }
  return (
    <div
      ref={host}
      className="experience-dossier__body after-typing"
      style={{ '--career-count': records.length } as CSSProperties}
    >
      <section className="experience-dossier__frame" aria-label="Work experience dossier">
        <CareerIndex
          records={records}
          selected={activeIndex}
          compact={compact}
          id={id}
          onSelect={select}
        />
        <DossierDetail
          key={activeIndex}
          record={active}
          count={records.length}
          id={id}
          expanded={expanded}
          direction={direction}
          onToggle={() => setExpanded((value) => !value)}
        />
      </section>
      <p className="experience-dossier__sr" role="status" aria-live="polite">
        {active.company} selected
      </p>
    </div>
  );
}
