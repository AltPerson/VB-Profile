import { IProject } from '@/constants/portfolio-data';

const media: Record<string, string> = {
  projectOne: '/assets/animations/project_first.webp',
  projectTwo: '/assets/animations/project_second.webp',
  projectThird: '/assets/animations/project_third.webp',
};
export function projectMedia(project: IProject, animated = true) {
  const source = media[project.bgName] ?? media.projectThird;
  return animated ? source : source.replace('.webp', '-poster.webp');
}
const requested = new Set<string>();
/** Warm an adjacent animation on genuine pointer, focus or swipe intent. */
export function warmProjectMedia(project: IProject) {
  const source = projectMedia(project);
  if (requested.has(source)) return;
  requested.add(source);
  const image = new Image();
  image.decoding = 'async';
  image.fetchPriority = 'low';
  image.src = source;
}
