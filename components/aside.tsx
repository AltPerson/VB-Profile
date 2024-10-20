'use client';
import { classNames } from '@/lib/utils/classnames';
import { AppRoutesEnum } from '@/types/enums';
import { usePathname } from 'next/navigation';
import React from 'react';

const Aside = () => {
  const pathname = usePathname();
  return (
    <aside className="flex-[1_0_50%] flex aside bg-black max-[992px]:hidden">
      <div className="flex-[1_0_50%] h-full text-white bg-black neon-wrapper-border aside-text relative">
        <h2 className="home-title home-title-animation-down">
          <span className="text-redlight pulsed-text">Front</span>
          <span className="pulsed-text-white">end</span>
        </h2>
        <h2 className="home-title home-title-animation-up">
          <span className="text-redlight pulsed-text">Dev</span>
          <span className="pulsed-text-white">eloper</span>
        </h2>
      </div>
      <div
        className={classNames(
          `flex-[1_1_50%] h-full`,
          pathname === AppRoutesEnum.HOME ? 'central-bg-0' : '',
          pathname === AppRoutesEnum.EXPERIENCE ? 'central-bg-1' : '',
          pathname === AppRoutesEnum.PROJECTS ? 'central-bg-2' : '',
          pathname === AppRoutesEnum.SKILLS ? 'central-bg-3' : '',
          pathname === AppRoutesEnum.CONTACT ? 'central-bg-4' : '',
        )}
      />
    </aside>
  );
};

export default Aside;
