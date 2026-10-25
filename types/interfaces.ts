import { Dispatch, SetStateAction } from 'react';
import { AppRoutesEnum, AppRoutesLabelsEnum } from './enums';

export interface ILink {
  path: AppRoutesEnum;
  label: AppRoutesLabelsEnum;
}

export interface IPlayMusicContext {
  playMusic: boolean;
  setPlayMusic: Dispatch<SetStateAction<boolean>>;
}
