import { DateValues } from '@/lib/utils/parsedAndFormateDate';
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
  term: DateValues;
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

export interface ILanguageData<T> {
  en: T;
  ua: T;
}

export const homeData: ILanguageData<IHomeDataElement> = {
  en: {
    title: 'Vladislav Bondarchuk',
    subtitle: 'Frontend developer',
    text: `<span className="text-white">Frontend developer</span> with
		<span className="text-white">over <span id="exp"></span></span> of commercial experience, contributing to teams of 2–10 people. 
		<br>
		<span className="text-white">Participated in full development cycles </span> — from requirements gathering to building and deploying production-ready features with test coverage and performance monitoring. 
		<br>
		<span className="text-white">Experienced in Agile development </span> environments. Continuously seeking to improve both <span className="text-white">code quality</span> and <span className="text-white">user experience</span>.`,
    buttonText: 'CHECK MY CV',
  },
  ua: {
    title: 'Владислав Бондарчук',
    subtitle: 'Фронтенд розробник',
    text: `<span className="text-white">Фронтенд розробник</span> з 
<span className="text-white">понад <span id="exp"></span></span> комерційного досвіду, працював у командах від 2 до 10 осіб.
<br />
<span className="text-white">Брав участь у повних циклах розробки</span> — від збору вимог до створення та деплою продакшен-функцій з тестовим покриттям і моніторингом продуктивності.
<br />
<span className="text-white">Має досвід у розробці за Agile-підходом</span>. Постійно прагну покращувати як <span className="text-white">якість коду</span>, так і <span className="text-white">користувацький досвід</span>.
`,
    buttonText: 'ПЕРЕГЛЯНУТИ РЕЗЮМЕ',
  },
};

export const experienceData: ILanguageData<IExperienceDataElement> = {
  en: {
    title: 'Experience',
    workPlaces: [
      {
        title: 'Frontend Developer - Radity',
        term: {
          startDate: {
            month: 2,
            year: 2024,
          },
        },
        description: `Contributed to the development of cutting-edge insurance projects for international companies.`,
        achievements: [
          {
            text: `Built a dynamic multi-endpoint form with conditional rendering and real-time validation, preventing invalid data entries and adapting to user input context`,
            keywords: [],
          },
          {
            text: `Created a flexible input component combining free text and autocomplete, streamlining data entry and increasing address entry success rate in edge cases by over 25%`,
            keywords: ['by over 25%'],
          },
          {
            text: `Optimized CI/CD pipeline by enabling matrix-based E2E test runs, reducing test time by approximately 35%`,
            keywords: ['by approximately 35%'],
          },
        ],
        technologies: [
          'HTML5',
          'CSS3',
          'TS',
          'React',
          'Redux',
          'Redux-Thunk',
          'Next.js',
          'MUI',
          'Playwright',
          'Formik',
          'Yup',
          'Vitest',
          'Chai',
          'Mocha',
          'Axios',
          'TanStack Query',
          'Git',
          'Vite',
          'Azure DevOps',
        ],
      },
      {
        title: 'React Developer - Upwork',
        term: {
          startDate: {
            month: 0,
            year: 2023,
          },
          endDate: {
            month: 2,
            year: 2024,
          },
        },
        description: `Built a study platform featuring synopses, commentary, images, and audio`,
        achievements: [
          {
            text: `Migrated the chat system Sendbird SDK from v3 to v4, improving load speed and responsiveness by approximately 20%`,
            keywords: ['by approximately 20%'],
          },
          {
            text: `Created a dynamic search feature for quick navigation across maps, people, and locations, improving usability and reducing search time by nearly 30%`,
            keywords: ['by nearly 30%'],
          },
          {
            text: `Implemented image upload with cropping and drag-and-drop, increasing user engagement and simplifying media sharing, which led to over 15% growth in media interactions`,
            keywords: ['to over 15%'],
          },
        ],
        technologies: [
          'HTML',
          'CSS',
          'JS',
          'SCSS',
          'Bootstrap',
          'Git',
          'ReactJS',
          'React-Router',
          'React-Quill',
          'React-Cropper',
          'React-Drag-Drop-Files',
          'React-Input-Range',
          'Sendbird SDK',
        ],
      },
    ],
  },
  ua: {
    title: 'Досвід',
    workPlaces: [
      {
        title: 'Frontend розробник - Radity',
        term: {
          startDate: {
            month: 2,
            year: 2024,
          },
        },
        description: `Брав участь у розробці міжнародних страхових платформ із використанням сучасних вебтехнологій`,
        achievements: [
          {
            text: `Розробив динамічну форму з підтримкою кількох кінцевих точок, умовним рендерингом і валідацією в реальному часі, що запобігає введенню некоректних даних і адаптується до контексту введення користувача`,
            keywords: [],
          },
          {
            text: `Створив гнучкий компонент введення, який поєднує вільний текст і автозаповнення, що спростило введення даних і підвищило успішність введення адрес у прикордонних випадках більш ніж на 25%`,
            keywords: ['більш ніж на 25%'],
          },
          {
            text: `Оптимізував CI/CD-пайплайн, реалізувавши матричні E2E-тести, що дозволило скоротити час тестування приблизно на 35%`,
            keywords: ['приблизно на 35%'],
          },
        ],
        technologies: [
          'HTML5',
          'CSS3',
          'TS',
          'React',
          'Redux',
          'Redux-Thunk',
          'Next.js',
          'MUI',
          'Playwright',
          'Formik',
          'Yup',
          'Vitest',
          'Chai',
          'Mocha',
          'Axios',
          'TanStack Query',
          'Git',
          'Vite',
          'Azure DevOps',
        ],
      },
      {
        title: 'React розробник - Upwork',
        term: {
          startDate: {
            month: 0,
            year: 2023,
          },
          endDate: {
            month: 2,
            year: 2024,
          },
        },
        description: `Розробив навчальну платформу з конспектами, коментарями, зображеннями та аудіо`,
        achievements: [
          {
            text: `Мігровано чат-систему Sendbird SDK з версії 3 на версію 4, що покращило швидкість завантаження та чутливість інтерфейсу приблизно на 20%`,
            keywords: ['приблизно на 20%'],
          },
          {
            text: `Реалізував динамічний пошук для швидкої навігації по мапах, людях і локаціях, що покращило зручність користування та зменшило час пошуку майже на 30%`,
            keywords: ['майже на 30%'],
          },
          {
            text: `Впровадив завантаження зображень з можливістю обрізки та drag-and-drop, що підвищило залучення користувачів і спростило обмін медіа — це призвело до зростання взаємодії з медіа більш ніж на 15%`,
            keywords: ['більш ніж на 15%'],
          },
        ],
        technologies: [
          'HTML',
          'CSS',
          'JS',
          'SCSS',
          'Bootstrap',
          'Git',
          'ReactJS',
          'React-Router',
          'React-Quill',
          'React-Cropper',
          'React-Drag-Drop-Files',
          'React-Input-Range',
          'Sendbird SDK',
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
      'HTML | HTML5',
      'CSS | CSS3',
      'SCSS',
      'JS',
      'TS',
      'Browser API',
      'REST API',
      'React.js',
      'Redux',
      'Redux-Thunk',
      'RTK',
      'TanStack Query',
      'Openapi-fetch',
      'Axios',
      'Next.js',
      'Formik',
      'Yup',
      'Zustand',
      'Vitest',
      'Chai',
      'Mocha',
      'Jest',
      'React Testing Library',
      'Playwright',
      'Material UI',
      'Boostrap',
      'Tailwind',
      'Styled-Components',
      'i18n',
      'Date-fns',
      'Photoshop',
      'Figma',
      'Git',
      'Azure DevOps',
      'CI/CD',
      'GitHub Actions',
      'Sentry',
      'Datadog',
      'Webpack',
      'Vite',
      'Jira',
      'Slack',
      'Linear',
    ],
  },
  ua: {
    title: 'Навички',
    skills: [
      'HTML | HTML5',
      'CSS | CSS3',
      'SCSS',
      'JS',
      'TS',
      'Browser API',
      'REST API',
      'React.js',
      'Redux',
      'Redux-Thunk',
      'RTK',
      'TanStack Query',
      'Openapi-fetch',
      'Axios',
      'Next.js',
      'Formik',
      'Yup',
      'Zustand',
      'Vitest',
      'Chai',
      'Mocha',
      'Jest',
      'React Testing Library',
      'Playwright',
      'Material UI',
      'Boostrap',
      'Tailwind',
      'Styled-Components',
      'i18n',
      'Date-fns',
      'Photoshop',
      'Figma',
      'Git',
      'Azure DevOps',
      'CI/CD',
      'GitHub Actions',
      'Sentry',
      'Datadog',
      'Webpack',
      'Vite',
      'Jira',
      'Slack',
      'Linear',
    ],
  },
};

export const contactData: ILanguageData<IContactDataElement> = {
  en: {
    title: 'Contact',
    contacts: [
      {
        title: 'email',
        link: 'nothinghardforyou@gmail.com',
        img: googleIcon,
      },
      {
        title: 'linkedin',
        link: 'https://www.linkedin.com/in/altperson/',
        img: linkedinIcon,
      },
      {
        title: 'gitHub',
        link: 'https://github.com/AltPerson',
        img: githubIcon,
      },
      {
        title: 'telegram',
        link: 'https://t.me/alt_person',
        img: telegramIcon,
      },
    ],
  },
  ua: {
    title: 'Контакти',
    contacts: [
      {
        title: 'email',
        link: 'nothinghardforyou@gmail.com',
        img: googleIcon,
      },
      {
        title: 'linkedin',
        link: 'https://www.linkedin.com/in/altperson/',
        img: linkedinIcon,
      },
      {
        title: 'gitHub',
        link: 'https://github.com/AltPerson',
        img: githubIcon,
      },
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
