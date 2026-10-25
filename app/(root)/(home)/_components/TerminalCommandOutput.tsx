import { ComponentType } from 'react';
import { personalCopy } from './personal-terminal-copy';
import { getTerminalData, OutputCommand } from './terminal-data';
import TerminalCommandLine from './TerminalCommandLine';
import {
  DocumentsOutput,
  HelpDirectoryOutput,
  IdentityOutput,
  OutputProps,
  ProfileOutput,
} from './TerminalOutputs';
import { TerminalEntry } from './useTerminalSession';

export const commandRenderers = {
  whoami: IdentityOutput,
  profile: ProfileOutput,
  documents: DocumentsOutput,
  help: HelpDirectoryOutput,
} satisfies Record<OutputCommand, ComponentType<OutputProps>>;

export default function TerminalCommandOutput({
  entry,
  active,
  data,
}: {
  entry: TerminalEntry;
  active: boolean;
  data: ReturnType<typeof getTerminalData>;
}) {
  const Renderer = entry.command === 'error' ? null : commandRenderers[entry.command];
  return (
    <section
      className="personal-terminal__entry"
      data-command-result={entry.command}
      data-origin={entry.origin}
      data-entry-id={entry.id}
    >
      <TerminalCommandLine
        text={entry.input}
        count={entry.count}
        active={active}
        id={'entry-' + entry.id}
      />
      {entry.revealed && (
        <div className="personal-terminal__entry-body" data-output-kind={entry.command}>
          {Renderer ? (
            <Renderer data={data} />
          ) : (
            <p className="terminal-output-error">{personalCopy.unknown}</p>
          )}
        </div>
      )}
    </section>
  );
}
