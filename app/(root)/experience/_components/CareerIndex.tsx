import { KeyboardEvent, useRef } from 'react';
import { CareerRecord, recordNumber } from './dossier-data';

export default function CareerIndex({
  records,
  selected,
  compact,
  id,
  onSelect,
}: {
  records: CareerRecord[];
  selected: number;
  compact: boolean;
  id: string;
  onSelect: (index: number) => void;
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function keys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    let next: number;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = records.length - 1;
    else if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (index + 1) % records.length;
    else if (['ArrowLeft', 'ArrowUp'].includes(event.key))
      next = (index - 1 + records.length) % records.length;
    else return;
    event.preventDefault();
    onSelect(next);
    buttons.current[next]?.focus({ preventScroll: true });
  }
  return (
    <div className="experience-dossier__index">
      <div
        role="tablist"
        aria-label="Career records"
        aria-orientation={compact ? 'horizontal' : 'vertical'}
        className="experience-dossier__tabs"
      >
        {records.map((record, index) => (
          <button
            key={`${record.source.title}-${record.source.term.startDate.year}-${record.source.term.startDate.month}`}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            className="experience-dossier__tab"
            onClick={() => onSelect(index)}
            onKeyDown={(event) => keys(event, index)}
          >
            <span className="experience-dossier__tab-number">{recordNumber(index)}</span>
            <strong className="experience-dossier__company">{record.company}</strong>
            <span className="experience-dossier__tab-role">{record.role}</span>
            <span className="experience-dossier__tab-date">{record.period}</span>
            <span
              id={`${id}-employment-${index}`}
              className={`experience-dossier__tab-status ${record.current ? 'is-current' : ''}`}
            >
              {record.current ? '● ACTIVE RECORD' : 'ARCHIVE ENTRY'}
            </span>
            <span className="experience-dossier__tab-dot" aria-hidden="true">
              {selected === index ? '●' : '◦'}
            </span>
          </button>
        ))}
      </div>
      <p className="experience-dossier__index-footer">SELECT TO INSPECT</p>
    </div>
  );
}
