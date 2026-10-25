import { DateValuesOneBased } from '@/lib/utils/parsedAndFormateDate';
import githubIcon from '@/public/assets/icons/github.svg';
import googleIcon from '@/public/assets/icons/google.svg';
import linkedinIcon from '@/public/assets/icons/linkedin.svg';
import telegramIcon from '@/public/assets/icons/telegram.svg';
import { AppRoutesLabelsEnum } from '@/types/enums';
interface IHomeDataElement {
  title: string;
  subtitle: string;
  text: string;
  buttonText: string;
}
type TLinksDataElement = Record<AppRoutesLabelsEnum, string>;
export interface IWorkPlace {
  title: string;
  term: DateValuesOneBased;
  description: string;
  technologies: string[];
  achievements: {
    text: string;
    keywords: string[];
  }[];
}
export interface IProject {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  bgName: string;
}
export interface IContact {
  title: string;
  link: string;
  img: string;
}
export interface IExperienceDataElement {
  title: string;
  workPlaces: IWorkPlace[];
}
export interface IProjectDataElement {
  title: string;
  projects: IProject[];
}
export interface ISkillsDataElement {
  title: string;
  skills: string[];
}
export interface IContactDataElement {
  title: string;
  contacts: IContact[];
}
export const homeData: IHomeDataElement = {
  title: 'Vladyslav Bondarchuk',
  subtitle: 'Frontend Engineer',
  text: `<span className="text-white">Frontend Engineer</span> specializing in React, Next.js, and TypeScript, with
		<span className="text-white"><span id="exp"></span></span> of experience building production web applications across InsurTech and EdTech.
		<br>
		Strong in complex, data-driven interfaces, frontend architecture, API integrations, and performance optimization.
		<br>
		Experienced in owning frontend features end-to-end, from implementation and testing to production release.
		<br>
		Actively use <span className="text-white">AI-assisted development tools</span> such as Claude Code, Codex, Cursor, and ChatGPT for code exploration, refactoring support, debugging, documentation lookup, test-case ideation, and faster UI iteration while keeping final implementation decisions and code review under my ownership.`,
  buttonText: 'CHECK MY CV',
};
export const experienceData: IExperienceDataElement = {
  title: 'Experience',
  workPlaces: [
    {
      title: 'Radity - Frontend Developer',
      term: { startDate: { month: 3, year: 2024 } },
      description: `Owned end-to-end frontend delivery of business-critical features using React, Next.js, and TypeScript, from component development and API integration to testing and production release`,
      achievements: [
        {
          text: `Implemented a complex, data-driven form workflow from scratch using Formik, Yup, and TanStack Query, featuring dynamic rendering, conditional logic, and asynchronous API integrations`,
          keywords: [],
        },
        {
          text: `Improved application completion and user experience by implementing flexible input handling and fallback mechanisms, eliminating critical blockers in customer workflows`,
          keywords: [],
        },
        {
          text: `Optimized CI/CD pipelines by introducing parallel Playwright E2E test sharding in GitHub Actions, reducing test execution time by ~33% and accelerating regression feedback before release`,
          keywords: ['by ~33%'],
        },
      ],
      technologies: [
        'HTML5',
        'CSS3',
        'React',
        'Redux',
        'Redux-Thunk',
        'Next.js',
        'TypeScript',
        'Formik',
        'Yup',
        'TanStack Query',
        'Playwright',
        'Material UI',
        'Vitest',
        'Axios',
        'OpenAPI',
        'Storybook',
        'Sentry',
        'Datadog',
        'Azure DevOps',
        'GitHub Actions',
        'Vite',
      ],
    },
    {
      title: 'Upwork - Frontend Developer',
      term: { startDate: { month: 11, year: 2022 }, endDate: { month: 3, year: 2024 } },
      description: `Developed interactive features for an e-learning platform, including content summaries, user discussions, and audio playback, enhancing content accessibility and user engagement`,
      achievements: [
        {
          text: `Migrated Sendbird Chat SDK from v3 to v4, refactoring legacy integrations and removing unused functionality to improve chat initialization performance by ~25%`,
          keywords: ['by ~25%'],
        },
        {
          text: `Implemented client-side media workflows for image uploading, cropping, and drag-and-drop interactions, simplifying content creation and sharing across the platform`,
          keywords: [],
        },
        {
          text: `Built site-wide content search, improving content discoverability and reducing the time users spent navigating educational materials by up to 30%`,
          keywords: ['up to 30%'],
        },
      ],
      technologies: [
        'HTML5',
        'CSS3',
        'JS',
        'SCSS',
        'Bootstrap',
        'React',
        'Sendbird SDK',
        'React-Cropper',
        'React-Drag-Drop-Files',
        'Webpack',
      ],
    },
  ],
};
export const projectsData: IProjectDataElement = {
  title: 'Projects',
  projects: [
    {
      title: 'VB Profile',
      description:
        'This is a portfolio website showcasing my work as a frontend developer, highlighting projects, skills, and experience in building dynamic and responsive web applications.',
      technologies: ['Next.js', 'TS', 'Tailwind'],
      link: 'https://vb-profile.netlify.app/',
      bgName: 'projectThird',
    },
    {
      title: 'Farang E-Commerce',
      description:
        'This is a Farang e-commerce website. This website was created as a pet-project, as reference was using the original website of Team Farang. The website has a convenient and clear design, which will allow you to feel the experience of buying goods more easily.',
      technologies: ['React', 'TS', 'SCSS', 'React-Router'],
      link: 'https://farang-e-commerce.netlify.app/',
      bgName: 'projectOne',
    },
    {
      title: 'Currency Exchanger App',
      description:
        'Currency Exchanger App is SPA which converts currency and shows latest currencies values. It allows users to convert currency by the query noted in the template. Also users can check latest currency values, and compare 1 to 1 currency that they need.',
      technologies: ['React', 'JS', 'Redux', 'React-Router', 'REST API (ExchangerRate)'],
      link: 'https://altperson.github.io/Currency-Exchanger/',
      bgName: 'projectTwo',
    },
    {
      title: 'Orders-n-Products',
      description:
        "Orders & Products is a simple website which was made as a test-task. It has simple functional and design. Website allows the user to view products in his order, delete his orders on Orders page, and also view, filter products on Products page. Website has a visitor's counter and language switcher.",
      technologies: [
        'React',
        'TS',
        'Redux Toolkit',
        'React-Router',
        'Socket.io',
        'i18n',
        'Bootstrap(SCSS)',
      ],
      link: 'https://orders-n-products.netlify.app/',
      bgName: 'projectThird',
    },
    {
      title: 'Note-App',
      description:
        'Note App is a SPA that simulates a simplified notepad from MacOs. It allows users to write a note by using markdown text or simple text. Users can save, delete or edit notes that are saved in indexDB of the browser.',
      technologies: ['React', 'JS', 'React-Icons', 'IndexDB'],
      link: 'https://altperson.github.io/Note-App/',
      bgName: 'projectOne',
    },
    {
      title: 'Music Search App',
      description:
        'Website for searching for music with simple and user-friendly interface which will allow you to feel the experience of searching and listening to music more easily.',
      technologies: ['React', 'JS', 'React-Router', 'REST API(Deezer)'],
      link: 'https://altperson.github.io/Music-Search-App/',
      bgName: 'projectTwo',
    },
    {
      title: 'Todo-List-App',
      description:
        'Todo List App is a SPA which represents a simple todo list app. Users can add, delete or edit a note in the todo list. Deployed version of website using a simple backend server on express.js for state management. The Github version has the Frontend and Backend part.',
      technologies: ['React', 'TS', 'React-Query', 'Tailwind', 'Node.js', 'Express.js'],
      link: 'https://test-pet-todolist.netlify.app',
      bgName: 'projectThird',
    },
  ],
};
export const skillsData: ISkillsDataElement = {
  title: 'Skills',
  skills: [
    'JavaScript ES6+',
    'TypeScript',
    'React',
    'Next.js',
    'React Router',
    'HTML5',
    'CSS3',
    'SCSS',
    'Hooks',
    'Context API',
    'App Router',
    'Pages Router',
    'SSR',
    'SSG',
    'CSR',
    'Server Components',
    'Server Actions',
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
    'React Hook Form',
    'Formik',
    'Yup',
    'Zod',
    'Dynamic Forms',
    'Conditional Validation',
    'Tailwind CSS',
    'Material UI (MUI)',
    'CSS Modules',
    'Styled Components',
    'Bootstrap',
    'shadcn/ui',
    'Radix UI',
    'Storybook',
    'Responsive Design',
    'Accessibility',
    'Frontend Architecture',
    'Reusable Components',
    'Custom Hooks',
    'Code Splitting',
    'Lazy Loading',
    'Core Web Vitals',
    'SEO',
    'Jest',
    'React Testing Library',
    'Playwright',
    'Vitest',
    'Mocha',
    'Chai',
    'Unit & E2E Testing',
    'Git',
    'Vite',
    'Webpack',
    'GitHub Actions',
    'Azure DevOps',
    'CI/CD',
    'Sentry',
    'Datadog',
    'Figma',
    'Jira',
    'OpenAI Codex',
    'Claude Code',
    'Cursor',
    'GitHub Copilot',
  ],
};
export const contactData: IContactDataElement = {
  title: 'Contact',
  contacts: [
    { title: 'email', link: 'nothinghardforyou@gmail.com', img: googleIcon },
    { title: 'linkedin', link: 'https://www.linkedin.com/in/altperson/', img: linkedinIcon },
    { title: 'GitHub', link: 'https://github.com/AltPerson', img: githubIcon },
    { title: 'telegram', link: 'https://t.me/alt_person', img: telegramIcon },
  ],
};
export const linksData: TLinksDataElement = {
  [AppRoutesLabelsEnum.HOME]: AppRoutesLabelsEnum.HOME,
  [AppRoutesLabelsEnum.EXPERIENCE]: AppRoutesLabelsEnum.EXPERIENCE,
  [AppRoutesLabelsEnum.PROJECTS]: AppRoutesLabelsEnum.PROJECTS,
  [AppRoutesLabelsEnum.SKILLS]: AppRoutesLabelsEnum.SKILLS,
  [AppRoutesLabelsEnum.CONTACT]: AppRoutesLabelsEnum.CONTACT,
};
