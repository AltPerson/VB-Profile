'use client';

import { TypingCompleteContext } from '@/contexts/typing-context';
import { useContext, useEffect, useState } from 'react';

const CHARACTER_DELAY_MS = 55;

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
}

function AnimatedText({ text, onComplete }: TypewriterTextProps) {
  const setTypingComplete = useContext(TypingCompleteContext);
  const [visibleCount, setVisibleCount] = useState(0);
  const characters = Array.from(text);

  useEffect(() => {
    setTypingComplete?.(false);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCount(Array.from(text).length);
      return;
    }

    const length = Array.from(text).length;
    if (length === 0) return;

    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setVisibleCount(count);
      if (count >= length) window.clearInterval(timer);
    }, CHARACTER_DELAY_MS);

    return () => window.clearInterval(timer);
  }, [text, setTypingComplete]);

  useEffect(() => {
    if (visibleCount >= characters.length) {
      setTypingComplete?.(true);
      onComplete?.();
    }
  }, [visibleCount, characters.length, onComplete, setTypingComplete]);

  return (
    <span className="typewriter">
      <span className="sr-only">{text}</span>
      <span className="typewriter-reserve" aria-hidden="true">
        {text}
      </span>
      <span className="typewriter-text" aria-hidden="true">
        {characters.slice(0, visibleCount).join('')}
        {visibleCount < characters.length && <span className="typewriter-caret" />}
      </span>
    </span>
  );
}

export default function TypewriterText({ text, onComplete }: TypewriterTextProps) {
  return <AnimatedText key={text} text={text} onComplete={onComplete} />;
}
