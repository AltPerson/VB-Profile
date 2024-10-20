import { Dispatch, SetStateAction } from 'react';
import { AppRoutesEnum, AppRoutesLabelsEnum, LanguageEnum } from './enums';

export interface ILink {
  path: AppRoutesEnum;
  label: AppRoutesLabelsEnum;
}

export interface ILanguageContext {
  language: LanguageEnum;
  setLanguage: Dispatch<SetStateAction<LanguageEnum>>;
}

export interface IPlayMusicContext {
  playMusic: boolean;
  setPlayMusic: Dispatch<SetStateAction<boolean>>;
}
