import { resumeLink } from '@/constants';

import { personalCopy } from './personal-terminal-copy';
import { commandGroups, commandNames, commandRegistry, getTerminalData } from './terminal-data';
import { finishTerminal } from './useTerminalSession';

export type OutputProps = { data: ReturnType<typeof getTerminalData> };
function OutputHeading({ title, meta }: { title: string; meta?: string | number }) {
  return (
    <div className="terminal-output-heading">
      <h3>{title}</h3>
      {meta !== undefined && <span>{meta}</span>}
    </div>
  );
}
export function IdentityOutput({ data }: OutputProps) {
  return (
    <div className="terminal-output-identity">
      <h2>
        {data.name}
        <span aria-hidden="true">_</span>
      </h2>
      <p>{data.role}</p>
    </div>
  );
}
export function ProfileOutput({ data }: OutputProps) {
  return (
    <dl className="terminal-output-profile">
      {data.profileRows.map((row) => (
        <div key={row.id} data-profile-key={row.id}>
          <dt>{row.label}:</dt>
          <dd className={row.id === 'experience' ? 'terminal-output-years' : undefined}>
            {row.value}
          </dd>
        </div>
      ))}
      <div className="terminal-output-approach" data-profile-key="approach">
        <dt>approach:</dt>
        <dd>
          <ol>
            {data.approach.map((step, index) => (
              <li key={step.title}>
                <span className="terminal-output-approach__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </dd>
      </div>
    </dl>
  );
}
export function ResumeFileRow() {
  const copy = personalCopy;
  return (
    <a
      className="personal-terminal__resume"
      href={resumeLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.cvAccessible}
      onClick={() => finishTerminal()}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M14 3H5v18h14V8l-5-5Zm0 0v5h5" />
      </svg>
      <span className="personal-terminal__file-copy">
        <strong>resume.pdf</strong>
        <span>{copy.cvLabel}</span>
      </span>
      <span className="personal-terminal__file-arrow" aria-hidden="true">
        <span>↗</span>
      </span>
    </a>
  );
}
export function DocumentsOutput() {
  return (
    <div className="terminal-output-documents">
      <ResumeFileRow />
    </div>
  );
}
export function HelpDirectoryOutput() {
  const copy = personalCopy;
  return (
    <div className="terminal-output-directory">
      <OutputHeading
        title={copy.labels.directory}
        meta={commandNames.length + ' ' + copy.labels.commandCount}
      />
      {commandGroups.map((group) => (
        <section className="terminal-output-command-group" key={group}>
          <h4>{copy.labels[group]}</h4>
          <dl>
            {commandNames
              .filter((name) => commandRegistry[name].group === group)
              .map((name) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{copy.descriptions[name]}</dd>
                </div>
              ))}
          </dl>
        </section>
      ))}
      <p className="terminal-output-note">{copy.labels.helpTip}</p>
    </div>
  );
}
