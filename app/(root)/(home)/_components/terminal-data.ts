import { homeData } from '@/constants/portfolio-data';
import { formatExperience } from '@/lib/utils/getExperience';
import { personalCopy } from './personal-terminal-copy';

export const commandNames = ['whoami', 'profile', 'documents', 'help', 'clear', 'reboot'] as const;
export type PortfolioCommand = (typeof commandNames)[number];
export type OutputCommand = Exclude<PortfolioCommand, 'clear' | 'reboot'>;
export type CommandGroup = 'identity' | 'development' | 'files' | 'system';
export const commandGroups = ['identity', 'development', 'files', 'system'] as const;
export const nodeCommands = {
  identity: 'whoami',
  files: 'documents',
  development: 'profile',
  system: 'help',
} as const satisfies Record<CommandGroup, OutputCommand>;
export const commandRegistry = {
  help: { group: 'system', kind: 'output' },
  whoami: { group: 'identity', kind: 'output' },
  profile: { group: 'development', kind: 'output' },
  documents: { group: 'files', kind: 'output' },
  clear: { group: 'system', kind: 'clear' },
  reboot: { group: 'system', kind: 'reboot' },
} as const satisfies Record<
  PortfolioCommand,
  { group: CommandGroup; kind: 'output' | 'clear' | 'reboot' }
>;
export function resolveCommand(input: string): PortfolioCommand | null {
  const normalized = input.trim().toLowerCase();
  return commandNames.some((command) => command === normalized)
    ? (normalized as PortfolioCommand)
    : null;
}
export function getTerminalData(years: number | null) {
  const formatted = years === null ? '…' : formatExperience(years);
  const copy = personalCopy;
  return {
    name: homeData.title,
    role: homeData.subtitle,
    experience: formatted,
    profileRows: [
      { id: 'experience', label: copy.keys[0], value: formatted },
      { id: 'core_stack', label: copy.keys[1], value: 'React / Next.js / TypeScript' },
      { id: 'domains', label: copy.keys[2], value: 'InsurTech / EdTech' },
      { id: 'specialization', label: copy.keys[3], value: copy.specialization },
    ],
    approach: [
      {
        title: 'AI-assisted development',
        text: 'I use AI tools to accelerate research and development while keeping technical decisions and code quality under my control.',
      },
      {
        title: 'Feature delivery',
        text: 'I turn product requirements into intuitive interfaces and production-ready features, connecting reusable components, application state, and APIs.',
      },
      {
        title: 'Engineering quality',
        text: 'I build maintainable and reliable applications through thoughtful architecture, automated testing, accessibility, and performance optimization.',
      },
    ],
  };
}
