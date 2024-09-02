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
  term: string;
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
export interface IExperienceDataElement {
  title: string;
  workPlaces: IWorkPlace[];
}

export interface IProjectDataElement {
  title: string;
  projects: IProject[];
}

export interface ILanguageData<T> {
  en: T;
  ua: T;
}

export const homeData: ILanguageData<IHomeDataElement> = {
  en: {
    title: 'Vladislav Bondarchuk',
    subtitle: 'Frontend Developer',
    text: `I\`m a <span className="text-white">Frontend developer</span> with
		<span className="text-white">1,5 years</span> of commercial experience and
		passion for creating complex and interesting web applications.
		<br />
		My positive sides are
		<span className="text-white">time management,</span>
		<span className="text-white"> communication,</span> and
		<span className="text-white"> the ability to learn quickly.</span>
		<br />
		So if you are looking for a
		<span className="text-white">skilled developer</span> to help bring your
		project to life, I am here and ready to help.`,
    buttonText: 'CHECK MY CV',
  },
  ua: {
    title: 'Владислав Бондарчук',
    subtitle: 'Фронтенд розробник',
    text: `Я <span className="text-white">Фронтенд-розробник</span> з
		<span className="text-white">1,5 роками</span> комерційного досвіду і
		пристрастю до створення складних і цікавих веб-додатків.
		<br />
		Моїми позитивними сторонами є 
		<span className="text-white">тайм-менеджмент,</span>
		<span className="text-white">комунікабельність,</span> та
		<span className="text-white">здатність до швидкого навчання.</span>
		<br />
		Тож якщо ви шукаєте
		<span className="text-white">кваліфікованого розробника</span> який допоможе втілити ваш
		проєкт у життя, я тут і готовий допомогти.`,
    buttonText: 'ПЕРЕГЛЯНУТИ РЕЗЮМЕ',
  },
};

export const experienceData: ILanguageData<IExperienceDataElement> = {
  en: {
    title: 'Experience',
    workPlaces: [
      {
        title: 'Frontend Developer - Radity',
        term: 'Mar 2024 - Present · 6 mos',
        description: `Contributed to the development of cutting-edge insurance projects for international companies.`,
        achievements: [
          {
            text: `I was building, styling, and shipping high-quality insurance portals for a diverse array of clients using technologies such as React, Next.js, Redux, JS, TS, Material UI, Figma, and more.`,
            keywords: ['React', 'Next.js', 'Redux', 'JS', 'TS', 'Material UI', 'Figma'],
          },
          {
            text: `I was working alongside product & project managers, designers, and other engineers to transform creative concepts into refined digital experiences at an agile (2 week) cadence.`,
            keywords: [
              'product',
              'project managers',
              'designers',
              'other engineers',
              'an agile (2 week)',
            ],
          },
          {
            text: `I was creating reusable, modern, and performant components for a lean, clean, and fast responsive layouts.`,
            keywords: [],
          },
          {
            text: `I was developing highly complex and performant server interactions, resulting in fast and reliable systems.`,
            keywords: [''],
          },
        ],
        technologies: [
          'HTML',
          'CSS',
          'SCSS',
          'TS',
          'JS',
          'React',
          'Redux',
          'Next.js',
          'Material UI',
          'Playwright',
          'Formik',
          'Vitest',
          'Axios',
          'React-Query',
          'Git',
          'Vite',
          'Azure DevOps',
        ],
      },
      {
        title: 'React Developer - Upwork',
        term: 'Jan 2023 - Mar 2024 · 1 yr 3 mos',
        description: `Worked on the project, development of a website, a versatile study resource that
	presents the Book of Mormon text accompanied by an array of supportive elements like
	narrative synopsis, images, commentary, audio, etc.`,
        achievements: [
          {
            text: `I migrated Sendbird SDK from version 3 to version 4, which is used for creating study groups, and direct message rooms between users, which made chat integrations faster and users experience better. `,
            keywords: ['Sendbird SDK'],
          },
          {
            text: `I integrated React-gluejar, React-cropper, React-drag-drop-files and developed an image uploading module, which is used to upload user image and change group image, also I integrated React-quill and developed an advanced editor for sending messages.`,
            keywords: ['React-gluejar', 'React-cropper', 'React-drag-drop-files', 'React-quill'],
          },
          {
            text: `I developed a settings menu for playback speed and volume for the video-player component of the website.`,
            keywords: [],
          },
          {
            text: `I fixed more than 20 bugs which increased user experience and functionality of the website.`,
            keywords: ['more than 20 bugs'],
          },
        ],
        technologies: [
          'HTML',
          'CSS',
          'JS',
          'SCSS',
          'Git',
          'ReactJS',
          'React-Router',
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
        term: 'Березень 2024 - Теперішній час · 6 місяців',
        description: `Брав участь у розвитку передових страхових проектів для міжнародних компаній.`,
        achievements: [
          {
            text: `Я створював, стилізував і постачав високоякісні страхові портали для різноманітних клієнтів, використовуючи такі технології, як React, Next.js, Redux, JS, TS, Material UI, Figma тощо.`,
            keywords: ['React', 'Next.js', 'Redux', 'JS', 'TS', 'Material UI', 'Figma'],
          },
          {
            text: `Я працював разом із менеджерами продуктів і проектів, дизайнерами та іншими інженерами, щоб перетворити творчі концепції на вишуканий цифровий досвід за гнучкого (2 тижнового) темпу.`,
            keywords: [
              'менеджерами продуктів',
              'проектів',
              'дизайнерами',
              'іншими інженерами',
              'гнучкого (2 тижнового)',
            ],
          },
          {
            text: `Я створював багаторазові, сучасні та продуктивні компоненти для компактних, чистих і швидко реагуючих макетів.`,
            keywords: [],
          },
          {
            text: `Я розробляв дуже складну та продуктивну взаємодію з сервером, що створювало швидкі та надійні системи.`,
            keywords: [''],
          },
        ],
        technologies: [
          'HTML',
          'CSS',
          'SCSS',
          'TS',
          'JS',
          'React',
          'Redux',
          'Next.js',
          'Material UI',
          'Playwright',
          'Formik',
          'Vitest',
          'Axios',
          'React-Query',
          'Git',
          'Vite',
          'Azure DevOps',
        ],
      },
      {
        title: 'React розробник - Upwork',
        term: 'Січень 2023 - Березень 2024 · 1 рік 3 місяці',
        description: `Працював над проектом, розробкою сайту, універсального навчального ресурсу, який
				представляє текст Книги Мормона, що супроводжується низкою допоміжних елементів, як-от
				короткий опис, зображення, коментарі, аудіо тощо.`,
        achievements: [
          {
            text: `Я переніс Sendbird SDK із версії 3 до версії 4, яка використовується для створення навчальних груп і кімнат для прямого спілкування між користувачами, завдяки чому інтеграція чату стала швидшою, а користувачам було краще.`,
            keywords: ['Sendbird SDK'],
          },
          {
            text: `Я інтегрував файли React-gluejar, React-cropper, React-drag-drop і розробив модуль завантаження зображень, який використовується для завантаження зображення користувача та зміни зображення групи, також я інтегрував React-quill і розробив розширений редактор для надсилання повідомлень.`,
            keywords: ['React-gluejar', 'React-cropper', 'React-drag-drop-files', 'React-quill'],
          },
          {
            text: `Я розробив меню налаштувань швидкості та гучності відтворення для відеопрогравача веб-сайту.`,
            keywords: [],
          },
          {
            text: `Я виправив понад 20 помилок, що покращило взаємодію з користувачем та функціональність веб-сайту.`,
            keywords: ['понад 20 помилок'],
          },
        ],
        technologies: [
          'HTML',
          'CSS',
          'JS',
          'SCSS',
          'Git',
          'ReactJS',
          'React-Router',
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
        link: 'https://altperson.github.io/Music-Search-App/',
        bgName: 'projectThird',
      },
    ],
  },
  ua: {
    title: 'Проєкти',
    projects: [{}],
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
