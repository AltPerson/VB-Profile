import { skillsData } from '@/constants/portfolio-data';
export const categories = [
  {
    id: 'core-frontend',
    label: 'Frontend',
    description: 'Core UI frameworks, rendering and browser foundations.',
    accent: '#5EF6FF',
    keys: [
      'JavaScript ES6+',
      'TypeScript',
      'React',
      'Next.js',
      'React Router',
      'HTML5',
      'Hooks',
      'Context API',
      'App Router',
      'Pages Router',
      'SSR',
      'SSG',
      'CSR',
      'Server Components',
      'Server Actions',
    ],
  },
  {
    id: 'styling-ui',
    label: 'Styling & UI',
    description: 'Styling systems, accessible and responsive interfaces.',
    accent: '#ED5BBA',
    keys: [
      'CSS3',
      'SCSS',
      'Tailwind CSS',
      'Material UI (MUI)',
      'CSS Modules',
      'Styled Components',
      'Bootstrap',
      'shadcn/ui',
      'Radix UI',
      'Responsive Design',
      'Accessibility',
    ],
  },
  {
    id: 'state-data',
    label: 'State & Data',
    description: 'State, API integrations and asynchronous data.',
    accent: '#A480FF',
    keys: [
      'Redux Toolkit',
      'RTK Query',
      'Redux Thunk',
      'Zustand',
      'TanStack Query',
      'REST',
      'GraphQL',
      'Apollo Client',
      'Axios',
      'OpenAPI',
      'WebSockets',
    ],
  },
  {
    id: 'forms-validation',
    label: 'Forms & Validation',
    description: 'Interactive forms, schemas and validation patterns.',
    accent: '#FFBC74',
    keys: ['React Hook Form', 'Formik', 'Yup', 'Zod', 'Dynamic Forms', 'Conditional Validation'],
  },
  {
    id: 'testing-quality',
    label: 'Testing & Quality',
    description: 'Tests, monitoring and user-facing quality.',
    accent: '#78F4C4',
    keys: [
      'Core Web Vitals',
      'SEO',
      'Jest',
      'React Testing Library',
      'Playwright',
      'Vitest',
      'Mocha',
      'Chai',
      'Unit & E2E Testing',
      'Sentry',
      'Datadog',
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture & Performance',
    description: 'Composable frontend design and performance techniques.',
    accent: '#72C8FF',
    keys: [
      'Frontend Architecture',
      'Reusable Components',
      'Custom Hooks',
      'Code Splitting',
      'Lazy Loading',
    ],
  },
  {
    id: 'tooling-delivery',
    label: 'Tools & Delivery',
    description: 'Developer workflow, delivery and collaboration tools.',
    accent: '#8DE7F0',
    keys: [
      'Storybook',
      'Git',
      'Vite',
      'Webpack',
      'GitHub Actions',
      'Azure DevOps',
      'CI/CD',
      'Figma',
      'Jira',
    ],
  },
  {
    id: 'ai-assisted',
    label: 'AI-Assisted Development',
    description: 'AI-powered developer tools in my workflow.',
    accent: '#F7B44C',
    keys: ['OpenAI Codex', 'Claude Code', 'Cursor', 'GitHub Copilot'],
  },
] as const;
export type CategoryId = (typeof categories)[number]['id'];
export interface Skill {
  id: string;
  label: string;
  categoryId: CategoryId;
}
export function getSkills(): Skill[] {
  const source = skillsData.skills;
  const assignments = categories.flatMap((category) =>
    category.keys.map((key) => ({ key, categoryId: category.id })),
  );
  if (
    assignments.length !== source.length ||
    new Set(assignments.map((item) => item.key)).size !== source.length ||
    new Set(source).size !== source.length ||
    assignments.some((item) => !source.includes(item.key))
  ) {
    throw new Error(
      'Skills taxonomy must classify every source skill exactly once in the source data.',
    );
  }
  return source.map((key) => ({
    id: key,
    label: key,
    categoryId: assignments.find((item) => item.key === key)!.categoryId,
  }));
}
export function categorySkills(categoryId: CategoryId, skills: Skill[]) {
  const category = categories.find((item) => item.id === categoryId)!;
  return category.keys.map((key) => skills.find((skill) => skill.id === key)!);
}
export const skillEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const skillsCopy = {
  technologies: 'TECHNOLOGIES',
  categories: 'Skill categories',
  search: 'Search technologies…',
  clear: 'Clear search',
  results: 'Search results',
  empty: 'No matching technologies',
  emptyHint: 'Try a different technology or clear your search.',
  back: 'Back to categories',
  category: 'Category',
  all: 'Across all categories',
};
