'use client';
import { useChangeLanguage } from '@/contexts/language-context';
import { homeData } from '@/locales';
import { LanguageEnum } from '@/types/enums';
import React from 'react';
import parse from 'html-react-parser';
import DefaultLayout from '@/components/default-layout';

const Content = () => {
  const { language } = useChangeLanguage();

  return (
    <DefaultLayout>
      <div>
        <h1 className="greetings-title home-greeting-title">{homeData[language]['title']}</h1>
        <h4 className="greetings-subtitle">{homeData[language]['subtitle']}</h4>
      </div>
      <p className="greetings-text text-justify">{parse(homeData[language]['text'])}</p>
      <div className="button-shadow">
        <a
          target="_blank"
          href="https://drive.google.com/file/d/1i1sQm6dMhN5_KwdRiunn7O2d7OqPwZHy/view?usp=sharing"
          className={`bg-aureolin button-text button-clip-path ${
            language === LanguageEnum.ENGLISH ? 'max-w-[220px]' : 'max-w-[335px]'
          } text-left p-[14px] border-r-[2px] border-red-600 button-bg hover-opacity block`}
        >
          {homeData[language]['buttonText']}
        </a>
      </div>
    </DefaultLayout>
  );
};

export default Content;
