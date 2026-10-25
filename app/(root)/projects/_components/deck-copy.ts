export const deckCopy = {
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
};
export type DeckCopy = typeof deckCopy;
export const deckEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const twoDigits = (value: number) => String(value).padStart(2, '0');
