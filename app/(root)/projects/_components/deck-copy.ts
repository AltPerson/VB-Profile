export const deckCopy = {
  en: {
    carousel: 'Selected projects',
    project: 'Project',
    of: 'of',
    category: 'WEB APP',
    archive: 'PROJECT ARCHIVE',
    previous: 'PREV',
    next: 'NEXT',
    previousLabel: 'Previous project',
    nextLabel: 'Next project',
    goTo: 'Go to project',
    liveDemo: 'LIVE DEMO',
    liveLabel: 'Open live demo for',
    stack: 'TECH STACK',
    description: 'Project description',
    preview: 'Select project',
  },
  ua: {
    carousel: 'Обрані проєкти',
    project: 'Проєкт',
    of: 'з',
    category: 'ВЕБЗАСТОСУНОК',
    archive: 'АРХІВ ПРОЄКТІВ',
    previous: 'НАЗАД',
    next: 'ДАЛІ',
    previousLabel: 'Попередній проєкт',
    nextLabel: 'Наступний проєкт',
    goTo: 'Перейти до проєкту',
    liveDemo: 'ВІДКРИТИ САЙТ',
    liveLabel: 'Відкрити сайт проєкту',
    stack: 'ТЕХНОЛОГІЇ',
    description: 'Опис проєкту',
    preview: 'Обрати проєкт',
  },
};
export type DeckCopy = (typeof deckCopy)['en'];
export const deckEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const twoDigits = (value: number) => String(value).padStart(2, '0');
