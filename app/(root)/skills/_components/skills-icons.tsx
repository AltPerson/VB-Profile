import { IconType } from 'react-icons';
import {
  SiClaude,
  SiCss,
  SiCursor,
  SiFigma,
  SiGit,
  SiGithubcopilot,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiMui,
  SiNextdotjs,
  SiReact,
  SiReacthookform,
  SiReactrouter,
  SiRedux,
  SiSass,
  SiSentry,
  SiStorybook,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
  SiVitest,
  SiWebpack,
  SiZod,
} from 'react-icons/si';
import { CategoryId } from './skills-taxonomy';

const brands: Record<string, [IconType, string]> = {
  'JavaScript ES6+': [SiJavascript, '#e5d56b'],
  TypeScript: [SiTypescript, '#69a9e5'],
  React: [SiReact, '#79dbea'],
  'Next.js': [SiNextdotjs, '#e3eef1'],
  'React Router': [SiReactrouter, '#db8f99'],
  HTML5: [SiHtml5, '#e69b7a'],
  CSS3: [SiCss, '#8dc9ed'],
  SCSS: [SiSass, '#d68fb4'],
  'Tailwind CSS': [SiTailwindcss, '#79dbea'],
  'Material UI (MUI)': [SiMui, '#69a9e5'],
  'Redux Toolkit': [SiRedux, '#b7a0e2'],
  'RTK Query': [SiRedux, '#b7a0e2'],
  'Redux Thunk': [SiRedux, '#b7a0e2'],
  GraphQL: [SiGraphql, '#d68fb4'],
  'React Hook Form': [SiReacthookform, '#df9b9b'],
  Zod: [SiZod, '#8db4e5'],
  Jest: [SiJest, '#db8f99'],
  'React Testing Library': [SiTestinglibrary, '#df9b9b'],
  Vitest: [SiVitest, '#b5d48b'],
  Sentry: [SiSentry, '#b7a0e2'],
  Storybook: [SiStorybook, '#e598b2'],
  Git: [SiGit, '#e69b7a'],
  Vite: [SiVite, '#b7a0e2'],
  Webpack: [SiWebpack, '#8dc9ed'],
  Figma: [SiFigma, '#b5c5df'],
  'Claude Code': [SiClaude, '#d9ac8d'],
  Cursor: [SiCursor, '#e3eef1'],
  'GitHub Copilot': [SiGithubcopilot, '#c4b9df'],
};
const symbols: Record<CategoryId, string> = {
  'core-frontend': 'm8 7-5 5 5 5m8-10 5 5-5 5m-2-14-4 18',
  'styling-ui':
    'M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4 2 2 0 0 1 0-4h3a4 4 0 0 0 4-4c0-4-5-6-9-6ZM7 9h.01M11 6h.01M16 7h.01M6 13h.01',
  'state-data': 'M3 6c0-4 18-4 18 0s-18 4-18 0Zm0 0v12c0 4 18 4 18 0V6M3 12c0 4 18 4 18 0',
  'forms-validation': 'M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 14l3 3 5-6',
  'testing-quality': 'M9 3h6m-5 0v6L4 19q-1 2 2 2h12q3 0 2-2L14 9V3M8 14h8',
  architecture: 'M3 3h7v7H3V3Zm11 11h7v7h-7v-7ZM3 14h7v7H3v-7Zm11-4V3h7v7h-7ZM10 6h4M6 10v4m4 4h4',
  'tooling-delivery': 'M14 5a5 5 0 0 0-6 6L3 16v5h5l5-5a5 5 0 0 0 6-6l-3 3-4-4 3-3Z',
  'ai-assisted': 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Zm7 0v4m-2-2h4',
};
export function CategoryIcon({ id }: { id: CategoryId }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={symbols[id]} />
    </svg>
  );
}
export function TechnologyIcon({ id, categoryId }: { id: string; categoryId: CategoryId }) {
  const brand = brands[id];
  if (!brand) return <CategoryIcon id={categoryId} />;
  const [Icon, color] = brand;
  return <Icon color={color} aria-hidden="true" focusable="false" />;
}
