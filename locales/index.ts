import { AppRoutesLabelsEnum } from "@/types/enums";

interface IHomeDataElement {
	title: string;
	subtitle: string;
	text: string;
	buttonText: string;
}

type ILinksDataElement = Record<AppRoutesLabelsEnum, string>

export interface ILinksData {
	en: ILinksDataElement,
	ua: ILinksDataElement
}

export interface IHomeData {
	en: IHomeDataElement,
	ua: IHomeDataElement
}

export const homeData: IHomeData = {
	en: {
		title: 'Vladislav Bondarchuk',
		subtitle: "Frontend Developer",
		text: `I\`m a <span className="text-white">Frontend developer</span> with
		<span className="text-white">1+ year</span> of commercial experience and
		passion for creating complex and interesting web applications.
		<br />
		My positive sides are
		<span className="text-white">time management</span>,
		<span className="text-white"> communication</span>, and
		<span className="text-white"> the ability to learn quickly</span>.
		<br />
		So if you are looking for a
		<span className="text-white">skilled developer</span> to help bring your
		project to life, I am here and ready to help.`,
		buttonText: 'CHECK MY CV'
	},
	ua: {
		title: 'Владислав Бондарчук',
		subtitle: "Фронтенд розробник",
		text: `Я <span className="text-white">Фронтенд-розробник</span> з
		<span className="text-white">1+ роком</span> комерційного досвіду і
		пристрастю до створення складних і цікавих веб-додатків.
		<br />
		Моїми позитивними сторонами є
		<span className="text-white">тайм-менеджмент</span>,
		<span className="text-white"> комунікабельність</span>, та
		<span className="text-white"> здатність до швидкого навчання</span>.
		<br />
		Тож якщо ви шукаєте
		<span className="text-white">кваліфікованого розробника</span> який допоможе втілити ваш
		проєкт у життя, я тут і готовий допомогти.`,
		buttonText: 'ПЕРЕГЛЯНУТИ РЕЗЮМЕ'
	}
}

export const linksData: ILinksData = {
	en: {
		[AppRoutesLabelsEnum.HOME]: AppRoutesLabelsEnum.HOME,
		[AppRoutesLabelsEnum.EXPERIENCE]: AppRoutesLabelsEnum.EXPERIENCE,
		[AppRoutesLabelsEnum.PROJECTS]: AppRoutesLabelsEnum.PROJECTS,
		[AppRoutesLabelsEnum.SKILLS]: AppRoutesLabelsEnum.SKILLS,
		[AppRoutesLabelsEnum.CONTACT]: AppRoutesLabelsEnum.CONTACT
	},
	ua: {
		[AppRoutesLabelsEnum.HOME]: "Головна",
		[AppRoutesLabelsEnum.EXPERIENCE]: "Досвід",
		[AppRoutesLabelsEnum.PROJECTS]: "Проєкти",
		[AppRoutesLabelsEnum.SKILLS]: "Навички",
		[AppRoutesLabelsEnum.CONTACT]: "Контакти"
	}
}

export const settingsHint = {
	en: 'Wanna a musical accompaniment? Enable it in settings!',
	ua: 'Хочете музичний супровід? Увімкніть його в налаштуваннях!'
}