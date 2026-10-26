import { CSSProperties } from 'react';
import { TechnologyIcon } from '../../skills/_components/skills-icons';
import { CareerRecord, recordNumber } from './dossier-data';

const iconAliases: Record<string, string> = {
  JS: 'JavaScript ES6+',
  Redux: 'Redux Toolkit',
  'Redux-Thunk': 'Redux Thunk',
  'Material UI': 'Material UI (MUI)',
};
function AchievementText({ text, keywords }: { text: string; keywords: string[] }) {
  const terms = keywords.filter(Boolean);
  if (!terms.length) return <>{text}</>;
  const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return (
    <>
      {text
        .split(new RegExp(`(${escaped.join('|')})`, 'g'))
        .map((part, index) => (terms.includes(part) ? <mark key={index}>{part}</mark> : part))}
    </>
  );
}
export default function DossierDetail({
  record,
  count,
  id,
  expanded,
  direction,
  onToggle,
}: {
  record: CareerRecord;
  count: number;
  id: string;
  expanded: boolean;
  direction: number;
  onToggle: () => void;
}) {
  const { source, company, role, current, period, duration, index } = record;
  return (
    <div
      id={`${id}-panel`}
      role="tabpanel"
      aria-labelledby={`${id}-tab-${index}`}
      tabIndex={0}
      className="experience-dossier__detail"
      style={{ '--career-direction': direction } as CSSProperties}
    >
      <div className="experience-dossier__record-brow">
        <span>
          FILE {recordNumber(index)} / {String(count).padStart(2, '0')}
        </span>
        <span className={current ? 'is-current' : ''}>{current ? '● ACTIVE' : '◌ ARCHIVED'}</span>
      </div>
      <h2>{company}</h2>
      <p className="experience-dossier__role">{role}</p>
      <div className="experience-dossier__metadata">
        <span className="experience-dossier__date">{period}</span>
        <span>{duration}</span>
      </div>
      <section className="experience-dossier__overview" aria-labelledby={`${id}-overview`}>
        <h3 id={`${id}-overview`} className="experience-dossier__section-title">
          <span>01 /</span> ROLE OVERVIEW
        </h3>
        <p data-description>{source.description}</p>
      </section>
      <section
        className="experience-dossier__contributions"
        aria-labelledby={`${id}-contributions`}
      >
        <div className="experience-dossier__section-heading">
          <h3 id={`${id}-contributions`} className="experience-dossier__section-title">
            <span>02 /</span> KEY CONTRIBUTIONS
          </h3>
        </div>
        <ol>
          {source.achievements.map((achievement, i) => (
            <li key={achievement.text}>
              <span className="experience-dossier__achievement-number" aria-hidden="true">
                {recordNumber(i)}
              </span>
              <p data-achievement>
                <AchievementText {...achievement} />
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section className="experience-dossier__stack" aria-labelledby={`${id}-stack-title`}>
        <div className="experience-dossier__section-heading">
          <h3 id={`${id}-stack-title`} className="experience-dossier__section-title">
            <span>03 /</span> TECH STACK
          </h3>
          {source.technologies.length > 7 && (
            <button
              type="button"
              className="experience-dossier__stack-toggle"
              aria-expanded={expanded}
              aria-controls={`${id}-tools`}
              onClick={onToggle}
              aria-label={
                expanded
                  ? 'Show less — Show fewer technologies'
                  : `Show all — Show all ${source.technologies.length} technologies`
              }
            >
              {expanded ? 'SHOW LESS' : 'SHOW ALL'}{' '}
              <span aria-hidden="true">{expanded ? '−' : '+'}</span>
            </button>
          )}
        </div>
        <ul className="experience-dossier__tools" id={`${id}-tools`}>
          {source.technologies.map((technology, i) => (
            <li key={technology} hidden={!expanded && i >= 7}>
              <TechnologyIcon
                id={iconAliases[technology] ?? technology}
                categoryId="tooling-delivery"
              />
              <span>{technology}</span>
            </li>
          ))}
        </ul>
      </section>
      <footer className="experience-dossier__record-footer">
        <span>END OF RECORD</span>
        <strong>VB · EXPERIENCE</strong>
      </footer>
    </div>
  );
}
