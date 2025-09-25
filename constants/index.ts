import { AppRoutesEnum, AppRoutesLabelsEnum } from '@/types/enums';
import { ILink } from '@/types/interfaces';

export const links: ILink[] = [
  {
    path: AppRoutesEnum.EXPERIENCE,
    label: AppRoutesLabelsEnum.EXPERIENCE,
  },
  {
    path: AppRoutesEnum.PROJECTS,
    label: AppRoutesLabelsEnum.PROJECTS,
  },
  {
    path: AppRoutesEnum.SKILLS,
    label: AppRoutesLabelsEnum.SKILLS,
  },
  {
    path: AppRoutesEnum.CONTACT,
    label: AppRoutesLabelsEnum.CONTACT,
  },
];

export const resumeLink =
  'https://drive.google.com/file/d/1ylI_iGUa0ANvIH8k8c0NJ_LcEsnbZ8pB/view?usp=sharing';
