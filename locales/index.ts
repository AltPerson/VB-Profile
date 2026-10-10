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
  achievements: { text: string; keywords: string[] }[];
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

export interface ILanguageData<T> {
  en: T;
  ua: T;
}

export const homeData: ILanguageData<IHomeDataElement> = {
  en: {
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
  },
  ua: {
    title: 'Владислав Бондарчук',
    subtitle: 'Frontend Engineer',
    text: `<span className="text-white">Frontend Engineer</span>, що спеціалізується на React, Next.js і TypeScript, з
		<span className="text-white"><span id="exp"></span></span> досвіду розробки production вебзастосунків у сферах InsurTech та EdTech.
		<br>
		Маю сильну експертизу у складних data-driven інтерфейсах, frontend-архітектурі, API-інтеграціях та оптимізації продуктивності.
		<br>
		Самостійно веду frontend-функціонал протягом усього циклу: від реалізації й тестування до production-релізу.
		<br>
		Активно використовую <span className="text-white">AI-assisted development tools</span>, зокрема Claude Code, Codex, Cursor і ChatGPT, для дослідження коду, підтримки рефакторингу, дебагу, пошуку документації, ідей для тестів і швидшої UI-ітерації, залишаючи фінальні рішення та code review за собою.`,
    buttonText: 'ПЕРЕГЛЯНУТИ РЕЗЮМЕ',
  },
};

export const experienceData: ILanguageData<IExperienceDataElement> = {
  en: {
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
  },
  ua: {
    title: 'Досвід',
    workPlaces: [
      {
        title: 'Radity — Frontend Developer',
        term: { startDate: { month: 3, year: 2024 } },
        description: `Відповідав за повний цикл frontend-розробки критично важливого бізнес-функціоналу на React, Next.js і TypeScript: від компонентів та API-інтеграцій до тестування і production-релізу`,
        achievements: [
          {
            text: `З нуля реалізував складний data-driven процес заповнення форми на Formik, Yup і TanStack Query із динамічним рендерингом, умовною логікою та асинхронними API-інтеграціями`,
            keywords: [],
          },
          {
            text: `Покращив завершення заявок і користувацький досвід завдяки гнучкій обробці введення та fallback-механізмам, усунувши критичні блокери в клієнтських сценаріях`,
            keywords: [],
          },
          {
            text: `Оптимізував CI/CD pipelines, запровадивши паралельний sharding Playwright E2E-тестів у GitHub Actions, скоротивши час виконання тестів на ~33% і прискоривши виявлення регресій перед релізом`,
            keywords: ['на ~33%'],
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
        title: 'Upwork — Frontend Developer',
        term: { startDate: { month: 11, year: 2022 }, endDate: { month: 3, year: 2024 } },
        description: `Розробляв інтерактивний функціонал для e-learning платформи, зокрема стислий виклад контенту, обговорення користувачів та відтворення аудіо, покращуючи доступність матеріалів і залученість користувачів`,
        achievements: [
          {
            text: `Мігрував Sendbird Chat SDK з v3 на v4, рефакторив legacy-інтеграції та видалив невикористаний функціонал, покращивши швидкість ініціалізації чату на ~25%`,
            keywords: ['на ~25%'],
          },
          {
            text: `Реалізував клієнтські процеси завантаження й обрізання зображень та drag-and-drop взаємодію, спростивши створення контенту й обмін ним на платформі`,
            keywords: [],
          },
          {
            text: `Створив глобальний пошук контенту, покращивши знаходження матеріалів і скоротивши час навігації навчальним контентом до 30%`,
            keywords: ['до 30%'],
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
  },
};

export const projectsData: ILanguageData<IProjectDataElement> = {
  en: {
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
        title: 'Мusіс Search Арр',
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
  },
  ua: {
    title: 'Проєкти',
    projects: [
      {
        title: 'VB Profile',
        description:
          'Це сайт-портфоліо, що демонструє мою роботу як фронтенд-розробника, акцентуючи на проєктах, навичках і досвіді у створенні динамічних та адаптивних веб-застосунків.',
        technologies: ['Next.js', 'TS', 'Tailwind'],
        link: 'https://vb-profile.netlify.app/',
        bgName: 'projectThird',
      },
      {
        title: 'Farang E-Commerce',
        description:
          'Це веб-сайт електронної комерції Farang. Цей веб-сайт було створено як пет-проект, як приклад використовувався оригінальний веб-сайт Team Farang. Сайт має зручний і зрозумілий дизайн, який дозволить вам легше відчути враження від покупки товару.',
        technologies: ['React', 'TS', 'SCSS', 'React-Router'],
        link: 'https://farang-e-commerce.netlify.app/',
        bgName: 'projectOne',
      },
      {
        title: 'Currency Exchanger App',
        description:
          'Currency Exchanger App - це SPA, який конвертує валюту та показує останні значення валют. Це дозволяє користувачам конвертувати валюту за запитом, зазначеним у шаблоні. Також користувачі можуть перевірити останні значення валюти та порівняти 1 до 1 валюти, яка їм потрібна.',
        technologies: ['React', 'JS', 'Redux', 'React-Router', 'REST API (ExchangerRate)'],
        link: 'https://altperson.github.io/Currency-Exchanger/',
        bgName: 'projectTwo',
      },
      {
        title: 'Orders-n-Products',
        description:
          'Orders & Products — простий веб-сайт, створений як тестове завдання. Має простий функціонал і дизайн. Веб-сайт дозволяє користувачеві переглядати продукти у своєму замовленні, видаляти свої замовлення на сторінці «Замовлення», а також переглядати та фільтрувати продукти на сторінці «Продукти». На сайті є лічильник відвідувачів і перемикач мов.',
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
          'Note App — це SPA, який імітує спрощений блокнот від MacOS. Це дозволяє користувачам писати нотатки, використовуючи текст розмітки або простий текст. Користувачі можуть зберігати, видаляти або редагувати нотатки, які зберігаються в indexDB браузера.',
        technologies: ['React', 'JS', 'React-Icons', 'IndexDB'],
        link: 'https://altperson.github.io/Note-App/',
        bgName: 'projectOne',
      },
      {
        title: 'Мusіс Search Арр',
        description:
          'Веб-сайт для пошуку музики з простим і зручним інтерфейсом, який дозволить вам легше відчути враження від пошуку та прослуховування музики.',
        technologies: ['React', 'JS', 'React-Router', 'REST API(Deezer)'],
        link: 'https://altperson.github.io/Music-Search-App/',
        bgName: 'projectTwo',
      },
      {
        title: 'Todo-List-App',
        description:
          'Todo List App – це SPA, який представляє просту програму зі списком справ. Користувачі можуть додавати, видаляти або редагувати нотатку в списку завдань. Розгорнута версія веб-сайту з використанням простого бекенд-сервера на Express.js для керування станом. Версія Github має Frontend і Backend частини.',
        technologies: ['React', 'TS', 'React-Query', 'Tailwind', 'Node.js', 'Express.js'],
        link: 'https://test-pet-todolist.netlify.app',
        bgName: 'projectThird',
      },
    ],
  },
};

export const skillsData: ILanguageData<ISkillsDataElement> = {
  en: {
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
  },
  ua: {
    title: 'Навички',
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
  },
};

export const contactData: ILanguageData<IContactDataElement> = {
  en: {
    title: 'Contact',
    contacts: [
      { title: 'email', link: 'nothinghardforyou@gmail.com', img: googleIcon },
      { title: 'linkedin', link: 'https://www.linkedin.com/in/altperson/', img: linkedinIcon },
      { title: 'GitHub', link: 'https://github.com/AltPerson', img: githubIcon },
      { title: 'telegram', link: 'https://t.me/alt_person', img: telegramIcon },
    ],
  },
  ua: {
    title: 'Контакти',
    contacts: [
      { title: 'email', link: 'nothinghardforyou@gmail.com', img: googleIcon },
      { title: 'linkedin', link: 'https://www.linkedin.com/in/altperson/', img: linkedinIcon },
      { title: 'GitHub', link: 'https://github.com/AltPerson', img: githubIcon },
      { title: 'telegram', link: 'https://t.me/alt_person', img: telegramIcon },
    ],
  },
};

export const linksData: ILanguageData<TLinksDataElement> = {
  en: {
    [AppRoutesLabelsEnum.HOME]: AppRoutesLabelsEnum.HOME,
    [AppRoutesLabelsEnum.EXPERIENCE]: AppRoutesLabelsEnum.EXPERIENCE,
    [AppRoutesLabelsEnum.PROJECTS]: AppRoutesLabelsEnum.PROJECTS,
    [AppRoutesLabelsEnum.SKILLS]: AppRoutesLabelsEnum.SKILLS,
    [AppRoutesLabelsEnum.CONTACT]: AppRoutesLabelsEnum.CONTACT,
  },
  ua: {
    [AppRoutesLabelsEnum.HOME]: 'Головна',
    [AppRoutesLabelsEnum.EXPERIENCE]: 'Досвід',
    [AppRoutesLabelsEnum.PROJECTS]: 'Проєкти',
    [AppRoutesLabelsEnum.SKILLS]: 'Навички',
    [AppRoutesLabelsEnum.CONTACT]: 'Контакти',
  },
};

export const settingsHint: ILanguageData<string> = {
  en: 'Wanna a musical accompaniment?<br/>Enable it in settings!',
  ua: 'Хочете музичний супровід?<br/>Увімкніть його в налаштуваннях!',
};
