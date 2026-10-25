'use client';
import { useEffect, useSyncExternalStore } from 'react';
import { personalContent } from './personal-terminal-copy';
import { commandRegistry, OutputCommand, resolveCommand } from './terminal-data';

export type TerminalEntry = {
  id: number;
  input: string;
  command: OutputCommand | 'error';
  origin: 'auto' | 'manual';
  createdAt: number;
  count: number;
  revealed: boolean;
  generation: number;
};
type Session = {
  phase: 'boot' | 'boot-exit' | 'utility' | 'auto-typing' | 'ready';
  entries: TerminalEntry[];
  history: string[];
  bootCounts: number[];
  active: string | number | null;
  bootReady: boolean;
  run: number;
  truncated: boolean;
  announcement: string;
  input: string;
  inputHint: string;
  nodeTyping: boolean;
};
export const startupCommands = ['whoami', 'profile', 'documents'] as const;
const initial: Session = {
  phase: 'boot',
  entries: [],
  history: [],
  bootCounts: [0, 0, 0, 0],
  active: null,
  bootReady: false,
  run: 0,
  truncated: false,
  announcement: '',
  input: '',
  inputHint: '',
  nodeTyping: false,
};
let session = initial;
let visited = false;
let nextId = 1;
let controller: AbortController | null = null;
let nodeTimer: number | null = null;
let nodeNonce = 0;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
export const getTerminalSession = () => session;
const serverSnapshot = () => initial;
function commit(patch: Partial<Session>) {
  session = { ...session, ...patch };
  listeners.forEach((listener) => listener());
}
function cancel() {
  controller?.abort();
  controller = null;
}
export function cancelPromptTyping(message = '') {
  nodeNonce++;
  if (nodeTimer !== null) window.clearTimeout(nodeTimer);
  nodeTimer = null;
  if (session.nodeTyping) commit({ nodeTyping: false, input: '', inputHint: message });
}
export function editPrompt(value: string) {
  cancelPromptTyping();
  commit({ input: value.slice(0, 256), inputHint: '' });
}

// All startup and user events enter this same resolver/dispatcher. No JSX or localized data is stored.
export function executeCommand(
  raw: string,
  origin: 'auto' | 'manual',
  typed = false,
  reduced = false,
): number | null {
  const input = raw.trim().slice(0, 256);
  if (!input) return null;
  if (origin === 'manual') {
    // UI entry points are disabled until ready; reject stale or programmatic clicks too.
    if (session.phase !== 'ready') return null;
    cancelPromptTyping();
    commit({ input: '', inputHint: '' });
    commit({ history: [...session.history, input].slice(-50) });
  }
  const command = resolveCommand(input);
  const definition = command ? commandRegistry[command] : null;
  if (definition?.kind === 'clear') {
    commit({ entries: [], truncated: false, announcement: '', run: session.run + 1 });
    return null;
  }
  if (definition?.kind === 'reboot') {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    startBoot(reduced);
    return null;
  }
  const id = nextId++;
  const entry: TerminalEntry = {
    id,
    input,
    command: (command as OutputCommand) ?? 'error',
    origin,
    createdAt: Date.now(),
    count: typed ? 0 : Array.from(input).length,
    revealed: !typed,
    generation: session.run,
  };
  const entries = [...session.entries, entry];
  commit({
    entries: entries.slice(-40),
    truncated: session.truncated || entries.length > 40,
    announcement: origin === 'manual' ? input : '',
  });
  return id;
}
export function requestNodeCommand(command: OutputCommand, reduced: boolean) {
  if (session.phase !== 'ready' || session.nodeTyping) return;
  if (session.input.trim()) {
    commit({ inputHint: 'Finish or clear your current command first.' });
    return;
  }
  if (reduced) {
    executeCommand(command, 'manual', false, true);
    return;
  }
  const nonce = ++nodeNonce,
    generation = session.run;
  let cursor = 0;
  commit({ input: '', inputHint: '', nodeTyping: true });
  const cadence = Math.max(45, Math.min(65, 320 / command.length));
  const step = () => {
    if (nonce !== nodeNonce || generation !== session.run || session.phase !== 'ready') return;
    if (cursor < command.length) {
      cursor++;
      commit({ input: command.slice(0, cursor) });
      nodeTimer = window.setTimeout(step, cadence);
    } else {
      nodeTimer = null;
      commit({ nodeTyping: false, input: '' });
      executeCommand(command, 'manual', false, reduced);
    }
  };
  nodeTimer = window.setTimeout(step, cadence);
}
export function finishTerminal() {
  if (session.phase === 'ready') return;
  cancel();
  visited = true;
  for (const command of startupCommands) {
    if (!session.entries.some((entry) => entry.origin === 'auto' && entry.command === command))
      executeCommand(command, 'auto');
  }
  commit({
    phase: 'ready',
    input: '',
    inputHint: '',
    nodeTyping: false,
    active: null,
    entries: session.entries.map((entry) => ({
      ...entry,
      count: Array.from(entry.input).length,
      revealed: true,
    })),
    announcement: '',
  });
}
function startBoot(reduced: boolean) {
  cancel();
  cancelPromptTyping();
  commit({
    phase: 'boot',
    entries: [],
    bootCounts: [0, 0, 0, 0],
    bootReady: false,
    active: null,
    run: session.run + 1,
    truncated: false,
    announcement: '',
    input: '',
    inputHint: '',
    nodeTyping: false,
  });
  if (reduced) {
    finishTerminal();
    return;
  }
  const task = new AbortController();
  controller = task;
  const wait = (ms: number) =>
    new Promise<void>((resolve, reject) => {
      let timer: number;
      const abort = () => {
        window.clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      };
      timer = window.setTimeout(() => {
        task.signal.removeEventListener('abort', abort);
        resolve();
      }, ms);
      task.signal.addEventListener('abort', abort, { once: true });
    });
  const run = async () => {
    // StrictMode's mount probe is canceled before claiming this document's first visit.
    await wait(30);
    if (task.signal.aborted) return;
    visited = true;
    const boot = personalContent.boot;
    for (let index = 0; index < boot.length; index++) {
      const text = boot[index];
      commit({ active: 'boot' + index });
      for (let count = 1; count <= Array.from(text).length; count++) {
        await wait(Math.max(15, Math.min(20, 480 / Array.from(text).length)));
        if (task.signal.aborted) return;
        commit({ bootCounts: session.bootCounts.map((value, i) => (i === index ? count : value)) });
      }
      commit({ active: null });
      await wait(50);
      if (task.signal.aborted) return;
    }
    commit({ bootReady: true });
    await wait(40);
    if (task.signal.aborted) return;
    commit({ phase: 'boot-exit' });
    await wait(200);
    if (task.signal.aborted) return;
    // Reveal the utility and actual input first, before starting canonical commands.
    commit({ phase: 'utility', input: '' });
    await wait(600);
    if (task.signal.aborted) return;
    commit({ phase: 'auto-typing' });
    for (const command of startupCommands) {
      for (let count = 1; count <= command.length; count++) {
        await wait(35);
        if (task.signal.aborted) return;
        commit({ input: command.slice(0, count) });
      }
      await wait(80);
      if (task.signal.aborted) return;
      executeCommand(command, 'auto');
      commit({ input: '', active: null });
      await wait(120);
      if (task.signal.aborted) return;
    }
    if (task.signal.aborted) return;
    controller = null;
    commit({ phase: 'ready', active: null });
  };
  run().catch((error) => {
    if (error.name !== 'AbortError') throw error;
  });
}
export function useTerminalSession(reduced: boolean) {
  const snapshot = useSyncExternalStore(subscribe, getTerminalSession, serverSnapshot);
  useEffect(() => {
    const navigationIntent = (event: MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
        return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement) || link.target === '_blank') return;
      const target = new URL(link.href, window.location.href);
      if (
        target.origin === window.location.origin &&
        target.pathname + target.search !== window.location.pathname + window.location.search
      )
        cancelPromptTyping();
    };
    const historyNavigation = () => cancelPromptTyping();
    document.addEventListener('click', navigationIntent, true);
    window.addEventListener('popstate', historyNavigation);
    if (!visited) startBoot(reduced);
    else if (session.phase !== 'ready') finishTerminal();
    return () => {
      document.removeEventListener('click', navigationIntent, true);
      window.removeEventListener('popstate', historyNavigation);
      cancelPromptTyping();
      cancel();
      if (visited && session.phase !== 'ready') finishTerminal();
    };
  }, [reduced]);
  return snapshot;
}
