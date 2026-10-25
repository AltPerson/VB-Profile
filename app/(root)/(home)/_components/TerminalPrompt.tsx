import { FormEvent, KeyboardEvent, memo, useEffect, useId, useRef, useState } from 'react';
import { personalCopy } from './personal-terminal-copy';
import { commandNames } from './terminal-data';
import {
  cancelPromptTyping,
  editPrompt,
  executeCommand,
  getTerminalSession,
  useTerminalSession,
} from './useTerminalSession';

function TerminalPrompt({
  reduced,
  ready,
  session,
}: {
  reduced: boolean;
  ready: boolean;
  session: ReturnType<typeof useTerminalSession>;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const input = session.input;
  const setInput = editPrompt;
  const historyIndex = useRef(getTerminalSession().history.length),
    observedHistory = useRef(getTerminalSession().history),
    draft = useRef('');
  const id = useId(),
    copy = personalCopy;
  const inputNode = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (session.nodeTyping && inputNode.current?.closest('[data-layout="natural"]')) {
      const main = inputNode.current.closest('main');
      if (main) main.scrollTop = main.scrollHeight;
    }
  }, [session.nodeTyping]);
  function execute(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (getTerminalSession().nodeTyping) {
      cancelPromptTyping('Command typing canceled. Enter your command.');
      return;
    }
    if (!input.trim() || !ready) return;
    executeCommand(input, 'manual', false, reduced);
    setInput('');
    setSuggestions([]);
    draft.current = '';
    historyIndex.current = getTerminalSession().history.length;
    observedHistory.current = getTerminalSession().history;
  }
  function keys(event: KeyboardEvent<HTMLInputElement>) {
    if (getTerminalSession().nodeTyping && (event.key === 'Escape' || event.key === 'Enter')) {
      event.preventDefault();
      cancelPromptTyping('Command typing canceled. Enter your command.');
      return;
    }
    const history = getTerminalSession().history;
    if (observedHistory.current !== history) {
      observedHistory.current = history;
      historyIndex.current = history.length;
    }
    if (event.key === 'ArrowUp' && history.length) {
      event.preventDefault();
      if (historyIndex.current === history.length) draft.current = input;
      historyIndex.current = Math.max(0, historyIndex.current - 1);
      setInput(history[historyIndex.current]);
    }
    if (event.key === 'ArrowDown' && history.length) {
      event.preventDefault();
      historyIndex.current = Math.min(history.length, historyIndex.current + 1);
      setInput(
        historyIndex.current === history.length ? draft.current : history[historyIndex.current],
      );
    }
    if (event.key === 'Tab' && !event.shiftKey && input.trim()) {
      const value = input.trim().toLowerCase();
      const options = commandNames.filter((name) => name.startsWith(value) && name !== value);
      if (options.length === 1) {
        event.preventDefault();
        setInput(options[0]);
        setSuggestions([]);
      } else setSuggestions(options);
    }
    if (event.key === 'Escape') setSuggestions([]);
  }
  return (
    <div className="personal-terminal__prompt-zone">
      <form className="personal-terminal__prompt" onSubmit={execute}>
        <span className="personal-terminal__prompt-mark" aria-hidden="true">
          ›
        </span>
        <label className="personal-terminal__sr" htmlFor={id}>
          {copy.commandLabel}
        </label>
        <input
          ref={inputNode}
          id={id}
          type="text"
          disabled={!ready}
          value={input}
          maxLength={256}
          placeholder={copy.placeholder}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          onFocus={() => {
            if (getTerminalSession().nodeTyping)
              cancelPromptTyping('Command typing canceled. Enter your command.');
          }}
          onChange={(event) => {
            const value = getTerminalSession().nodeTyping
              ? ((event.nativeEvent as InputEvent).data ?? '')
              : event.target.value;
            setInput(value);
            setSuggestions([]);
          }}
          onKeyDown={keys}
          aria-describedby={id + '-hint'}
        />
        <button type="submit" disabled={!ready || session.nodeTyping} aria-label={copy.submit}>
          ↵
        </button>
      </form>
      <p className="personal-terminal__hint" id={id + '-hint'} role="status" aria-live="polite">
        {!ready
          ? 'Starting terminal…'
          : session.inputHint ||
            (session.nodeTyping
              ? 'Typing command… Esc to cancel'
              : suggestions.length
                ? suggestions.join(' · ')
                : copy.hint)}
      </p>
    </div>
  );
}
export default memo(TerminalPrompt);
