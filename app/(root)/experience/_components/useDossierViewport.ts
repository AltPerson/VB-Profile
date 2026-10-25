import { useEffect, useRef, useState } from 'react';

const MIN_DETAIL_HEIGHT = 280;

export function useDossierViewport() {
  const host = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<'bounded' | 'natural'>('bounded');
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const root = host.current;
    if (!root) return;
    const header = root.parentElement?.querySelector<HTMLElement>('.site-header');
    const main = root.querySelector<HTMLElement>('main');
    const inner = main?.firstElementChild as HTMLElement | null;
    const heading = root.querySelector<HTMLElement>('.experience-dossier__heading');
    const body = root.querySelector<HTMLElement>('.experience-dossier__body');
    const index = root.querySelector<HTMLElement>('.experience-dossier__index');
    const tabs = root.querySelector<HTMLElement>('.experience-dossier__tabs');
    const hint = root.querySelector<HTMLElement>('.experience-dossier__index-footer');
    if (!main || !inner || !heading || !body || !index || !tabs) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mobile = matchMedia('(max-width: 992px)').matches;
        const horizontal = mobile || body.getBoundingClientRect().width <= 600;
        const visual = window.visualViewport;
        const offset = visual?.offsetTop ?? 0;
        const bottom = offset + (visual?.height ?? innerHeight);
        const reserve = parseFloat(getComputedStyle(root).paddingBottom) || 0;
        const space = Math.max(
          0,
          bottom - Math.max(header?.getBoundingClientRect().bottom ?? 80, offset) - reserve,
        );
        root.style.setProperty('--career-space', `${space}px`);
        const style = getComputedStyle(inner);
        const frameHeight =
          space -
          parseFloat(style.paddingTop) -
          parseFloat(style.paddingBottom) -
          heading.getBoundingClientRect().height -
          (parseFloat(style.rowGap) || 0) -
          2;
        const selectorHeight = horizontal ? index.getBoundingClientRect().height : 0;
        const minimumIndex = horizontal
          ? 0
          : tabs.scrollHeight + (hint?.getBoundingClientRect().height ?? 0);
        setCompact(horizontal);
        setLayout(
          frameHeight - selectorHeight >= MIN_DETAIL_HEIGHT && frameHeight >= minimumIndex
            ? 'bounded'
            : 'natural',
        );
      });
    };
    const observer = new ResizeObserver(measure);
    for (const element of [header, root, heading, body, index, tabs, hint])
      if (element) observer.observe(element);
    window.addEventListener('resize', measure);
    window.visualViewport?.addEventListener('resize', measure);
    window.visualViewport?.addEventListener('scroll', measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
      window.visualViewport?.removeEventListener('resize', measure);
      window.visualViewport?.removeEventListener('scroll', measure);
    };
  }, []);
  return { host, layout, compact };
}
