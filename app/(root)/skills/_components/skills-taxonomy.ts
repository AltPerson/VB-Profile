import { skillsData } from '@/locales';

export type SkillsLocale = 'en' | 'ua';
export const categories = [
  {
    id: 'core-frontend',
    labels: {
      en: 'Frontend',
      ua: 'Фронтенд',
    },
    descriptions: {
      en: 'Core UI frameworks, rendering and browser foundations.',
      ua: 'Фреймворки, рендеринг і вебоснова.',
    },
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
    labels: {
      en: 'Styling & UI',
      ua: 'Стилізація та UI',
    },
    descriptions: {
      en: 'Styling systems, accessible and responsive interfaces.',
      ua: 'Системи стилізації, доступність і адаптивні інтерфейси.',
    },
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
    labels: {
      en: 'State & Data',
      ua: 'Стан і дані',
    },
    descriptions: {
      en: 'State, API integrations and asynchronous data.',
      ua: 'Керування станом, API та асинхронними даними.',
    },
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
    labels: {
      en: 'Forms & Validation',
      ua: 'Форми та валідація',
    },
    descriptions: {
      en: 'Interactive forms, schemas and validation patterns.',
      ua: 'Інтерактивні форми, схеми та підходи до валідації.',
    },
    accent: '#FFBC74',
    keys: ['React Hook Form', 'Formik', 'Yup', 'Zod', 'Dynamic Forms', 'Conditional Validation'],
  },
  {
    id: 'testing-quality',
    labels: {
      en: 'Testing & Quality',
      ua: 'Тестування та якість',
    },
    descriptions: {
      en: 'Tests, monitoring and user-facing quality.',
      ua: 'Тести, моніторинг і якість користувацького досвіду.',
    },
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
    labels: {
      en: 'Architecture & Performance',
      ua: 'Архітектура й оптимізація',
    },
    descriptions: {
      en: 'Composable frontend design and performance techniques.',
      ua: 'Компонентна архітектура та оптимізація продуктивності.',
    },
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
    labels: {
      en: 'Tools & Delivery',
      ua: 'Інструменти та доставка',
    },
    descriptions: {
      en: 'Developer workflow, delivery and collaboration tools.',
      ua: 'Інструменти розробки, доставки та командної роботи.',
    },
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
    labels: {
      en: 'AI-Assisted Development',
      ua: 'AI-інструменти розробки',
    },
    descriptions: {
      en: 'AI-powered developer tools in my workflow.',
      ua: 'AI-інструменти, які використовую в розробці.',
    },
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
export function getSkills(locale: SkillsLocale): Skill[] {
  const source = skillsData.en.skills;
  const localized = skillsData[locale].skills;
  const assignments = categories.flatMap((category) =>
    category.keys.map((key) => ({ key, categoryId: category.id })),
  );
  if (
    assignments.length !== source.length ||
    localized.length !== source.length ||
    new Set(assignments.map((item) => item.key)).size !== source.length ||
    new Set(localized).size !== localized.length ||
    assignments.some((item) => !source.includes(item.key))
  ) {
    throw new Error(
      'Skills taxonomy must classify every source skill exactly once in both locales.',
    );
  }
  return source.map((key, index) => ({
    id: key,
    label: localized[index],
    categoryId: assignments.find((item) => item.key === key)!.categoryId,
  }));
}
export function categorySkills(categoryId: CategoryId, skills: Skill[]) {
  const category = categories.find((item) => item.id === categoryId)!;
  return category.keys.map((key) => skills.find((skill) => skill.id === key)!);
}
export const skillEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const skillsCopy = {
  en: {
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
  },
  ua: {
    technologies: 'ТЕХНОЛОГІЙ',
    categories: 'Категорії навичок',
    search: 'Пошук технологій…',
    clear: 'Очистити пошук',
    results: 'Результати пошуку',
    empty: 'Нічого не знайдено',
    emptyHint: 'Спробуйте іншу назву технології або очистіть пошук.',
    back: 'До категорій',
    category: 'Категорія',
    all: 'У всіх категоріях',
  },
};
