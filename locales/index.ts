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
    subtitle: 'Middle Frontend Developer',
    text: `<span className="text-white">Middle Frontend Developer</span> with
		<span className="text-white"><span id="exp"></span></span> of experience building production React and Next.js applications for international product teams.
		<br>
		Strong in <span className="text-white">TypeScript</span>, complex forms, API integration, async data flows, performance optimization, and production-quality UI.
		<br>
		Experienced in delivering user-facing features from UI architecture and state management to testing, monitoring, and release.
		<br>
		Actively use <span className="text-white">AI-assisted development tools</span> such as Claude Code, Codex, Cursor, and ChatGPT for code exploration, refactoring support, debugging, documentation lookup, test-case ideation, and faster UI iteration while keeping final implementation decisions and code review under my ownership.`,

    buttonText: 'CHECK MY CV',
  },
  ua: {
    title: 'Владислав Бондарчук',
    subtitle: 'Middle Frontend Developer',
    text: `<span className="text-white">Middle Frontend Developer</span> з
		<span className="text-white"><span id="exp"></span></span> досвіду у створенні production React та Next.js застосунків для міжнародних продуктових команд.
		<br>
		Сильний у <span className="text-white">TypeScript</span>, складних формах, API-інтеграціях, асинхронних потоках даних, оптимізації продуктивності та production-quality UI.
		<br>
		Маю досвід доставки user-facing функціоналу від UI-архітектури та state management до тестування, моніторингу і релізу.
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
        description: `Built and maintained production insurance portals using React, Next.js, TypeScript, Redux, TanStack Query, and Material UI`,
        achievements: [
          {
            text: `Contributed across UI architecture, API integration, validation logic, testing, monitoring, and release`,
            keywords: [],
          },
          {
            text: `Implemented complex multi-endpoint form flows with Formik, Yup, and TanStack Query, including conditional rendering,
async data handling, and real-time validation for business-critical user journeys`,
            keywords: [],
          },
          {
            text: `Created a flexible input component with free-text, autocomplete, and fallback behavior using Material UI, improving data
entry for edge cases and reducing friction in complex form scenarios`,
            keywords: [],
          },
          {
            text: `Optimized CI/CD feedback by introducing matrix-based E2E test execution, reducing test runtime by ~35% and helping the
team catch regressions faster before release`,
            keywords: ['by ~35%'],
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
          'Openapi-fetch',
          'Storybook',
          'Sentry',
          'Datadog',
          'Azure DevOps',
          'Vite',
        ],
      },
      {
        title: 'Upwork - Frontend Developer',
        term: { startDate: { month: 11, year: 2022 }, endDate: { month: 3, year: 2024 } },
        description: `Delivered frontend features for an e-learning platform, including synopses, comments, image uploads, audio playback, and content search`,
        achievements: [
          {
            text: `Focused on smooth user interaction and maintainable React implementation`,
            keywords: [],
          },
          {
            text: `Migrated Sendbird Chat SDK from v3 to v4, removed unused integration parts, and improved chat-related initial load and
responsiveness by ~25%`,
            keywords: ['by ~25%'],
          },
          {
            text: `Implemented client-side media workflows including image upload, crop, and drag-and-drop, simplifying content creation
and media sharing for users`,
            keywords: [],
          },
          {
            text: `Built a site-wide search experience that improved content discovery and reduced time spent navigating across the
platform by up to 30%`,
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
        description: `Розробляв і підтримував production страхові портали з використанням React, Next.js, TypeScript, Redux, TanStack Query та Material UI`,
        achievements: [
          {
            text: `Працював над UI-архітектурою, API-інтеграціями, логікою валідації, тестуванням, моніторингом і релізом`,
            keywords: [],
          },
          {
            text: `Реалізував складні multi-endpoint form flows з Formik, Yup і TanStack Query, включно з умовним відображенням,
асинхронною обробкою даних і валідацією в реальному часі для business-critical user journeys`,
            keywords: [],
          },
          {
            text: `Створив гнучкий input component з free-text, autocomplete і fallback behavior на Material UI, покращивши введення
даних для edge cases і зменшивши friction у складних form scenarios`,
            keywords: [],
          },
          {
            text: `Оптимізував CI/CD feedback, запровадивши matrix-based E2E test execution, скоротивши test runtime на ~35% і допомігши
команді швидше ловити регресії перед релізом`,
            keywords: ['на ~35%'],
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
          'Openapi-fetch',
          'Storybook',
          'Sentry',
          'Datadog',
          'Azure DevOps',
          'Vite',
        ],
      },
      {
        title: 'Upwork — Frontend Developer',
        term: { startDate: { month: 11, year: 2022 }, endDate: { month: 3, year: 2024 } },
        description: `Розробляв frontend features для e-learning платформи, включно з конспектами, коментарями, image uploads, audio playback і content search`,
        achievements: [
          {
            text: `Фокусувався на плавній взаємодії користувача та maintainable React implementation`,
            keywords: [],
          },
          {
            text: `Мігрував Sendbird Chat SDK з v3 на v4, прибрав невикористані частини інтеграції та покращив chat-related initial load
і responsiveness на ~25%`,
            keywords: ['на ~25%'],
          },
          {
            text: `Реалізував client-side media workflows, включно з image upload, crop і drag-and-drop, спростивши content creation
та media sharing для користувачів`,
            keywords: [],
          },
          {
            text: `Побудував site-wide search experience, що покращив content discovery і скоротив час навігації платформою до 30%`,
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
      'TypeScript',
      'JavaScript ES2020+',
      'React',
      'Next.js',
      'React Router',
      'HTML5',
      'CSS3 | SCSS',
      'Core Web Vitals',
      'TanStack Query',
      'Redux Toolkit',
      'Redux Thunk',
      'Zustand',
      'REST APIs',
      'Axios',
      'Openapi-fetch',
      'GraphQL | Apollo',
      'Formik',
      'React Hook Form',
      'Yup',
      'Zod',
      'Conditional validation',
      'Multi-endpoint forms',
      'Material UI',
      'Tailwind CSS',
      'Styled Components',
      'Bootstrap',
      'shadcn/ui | Radix',
      'Storybook',
      'Responsive UI',
      'Accessibility',
      'Jest',
      'React Testing Library',
      'Playwright',
      'Vitest',
      'Mocha | Chai',
      'ESLint',
      'Prettier',
      'Vite',
      'Webpack',
      'Git',
      'GitHub Actions',
      'Azure DevOps',
      'CI/CD',
      'Sentry',
      'Datadog',
      'Figma handoff',
      'Agile',
      'Jira',
      'Linear',
      'Distributed international teams',
    ],
  },
  ua: {
    title: 'Навички',
    skills: [
      'TypeScript',
      'JavaScript ES2020+',
      'React',
      'Next.js',
      'React Router',
      'HTML5',
      'CSS3 | SCSS',
      'Core Web Vitals',
      'TanStack Query',
      'Redux Toolkit',
      'Redux Thunk',
      'Zustand',
      'REST APIs',
      'Axios',
      'Openapi-fetch',
      'GraphQL | Apollo',
      'Formik',
      'React Hook Form',
      'Yup',
      'Zod',
      'Conditional validation',
      'Multi-endpoint forms',
      'Material UI',
      'Tailwind CSS',
      'Styled Components',
      'Bootstrap',
      'shadcn/ui | Radix',
      'Storybook',
      'Responsive UI',
      'Accessibility',
      'Jest',
      'React Testing Library',
      'Playwright',
      'Vitest',
      'Mocha | Chai',
      'ESLint',
      'Prettier',
      'Vite',
      'Webpack',
      'Git',
      'GitHub Actions',
      'Azure DevOps',
      'CI/CD',
      'Sentry',
      'Datadog',
      'Figma handoff',
      'Agile',
      'Jira',
      'Linear',
      'Distributed international teams',
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
