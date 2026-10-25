import { useEffect, useRef, useState } from 'react';

// Home-only sizing: the shared header/left panel are measured, never resized here.
export function useTerminalViewport(phase: string) {
  const host = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<'desktop' | 'sticky' | 'natural'>('desktop');
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const header = node.parentElement?.querySelector<HTMLElement>('.site-header');
    const main = node.querySelector<HTMLElement>('main');
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mobile = window.matchMedia('(max-width: 992px)').matches;
        if (!mobile) {
          setLayout('desktop');
          return;
        }
        const visual = window.visualViewport;
        const height = visual?.height ?? window.innerHeight;
        const top = (visual?.offsetTop ?? 0) + height;
        const headerBottom = header?.getBoundingClientRect().bottom ?? 80;
        const available = Math.max(0, top - Math.max(headerBottom, visual?.offsetTop ?? 0) - 48);
        node.style.setProperty('--pt-mobile-space', available + 'px');
        // Conservative allowance for chrome, accessible nodes, prompt and >=180px text.
        const prompt = node.querySelector<HTMLElement>('.personal-terminal__prompt-slot');
        const safeBottom = prompt ? parseFloat(getComputedStyle(prompt).paddingBottom) || 0 : 0;
        const sticky = available >= 530 + safeBottom;
        setLayout(sticky ? 'sticky' : 'natural');
        if (
          !sticky &&
          node.contains(document.activeElement) &&
          document.activeElement?.tagName === 'INPUT'
        ) {
          (document.activeElement as HTMLElement).scrollIntoView({ block: 'nearest' });
          if (main) main.scrollTop = main.scrollHeight;
        }
      });
    };
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
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
  }, [phase]);
  return { host, layout };
}
