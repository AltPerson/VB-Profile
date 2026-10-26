'use client';

import { TypingCompleteContext } from '@/contexts/typing-context';
import { ReactNode, useState } from 'react';
import AnimatedCity from './animated-city';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const [typingComplete, setTypingComplete] = useState(false);
  return (
    <TypingCompleteContext.Provider value={setTypingComplete}>
      <main
        data-typing-complete={typingComplete}
        className="max-[992px]:central-text max-[992px]:p-[2px] content-part"
      >
        <div className="city-media-surface max-[992px]:central-bg-mobile-0 h-full flex flex-col gap-9 max-[425px]:gap-3 pb-4 pt-[10%] max-[992px]:pt-[5%] max-md:gap-4 max-[992px]:pb-12">
          {children}
          <AnimatedCity mobileOnly />
        </div>
      </main>
    </TypingCompleteContext.Provider>
  );
};

export default DefaultLayout;
