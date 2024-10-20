'use client';
import { useContext, useLayoutEffect } from 'react';
import { LanguageEnum } from '@/types/enums';
import { ILanguageContext } from '@/types/interfaces';
import { ReactNode, createContext, useState } from 'react';

export const LanguageContext = createContext<ILanguageContext>({
  language: LanguageEnum.ENGLISH,
  setLanguage: () => {},
});

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageEnum>(LanguageEnum.ENGLISH);

  useLayoutEffect(() => {
    const localStorageData =
      typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    console.log('LocalStorageData', localStorageData);
    localStorageData === null
      ? setLanguage(LanguageEnum.ENGLISH)
      : setLanguage(localStorageData as LanguageEnum);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useChangeLanguage = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const toggleLanguage = () => {
    setLanguage((prev) => {
      if (prev === LanguageEnum.ENGLISH) {
        typeof window !== 'undefined' &&
          window.localStorage.setItem('language', LanguageEnum.UKRAINE);
        return LanguageEnum.UKRAINE;
      } else {
        typeof window !== 'undefined' &&
          window.localStorage.setItem('language', LanguageEnum.ENGLISH);
        return LanguageEnum.ENGLISH;
      }
    });
  };
  return {
    language,
    toggleLanguage,
  };
};
