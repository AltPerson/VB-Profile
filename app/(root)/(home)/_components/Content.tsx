'use client';
import DefaultLayout from '@/components/default-layout';
import TypewriterText from '@/components/typewriter-text';
import { resumeLink } from '@/constants';
import { useChangeLanguage } from '@/contexts/language-context';
import { parsedAndFormateDate } from '@/lib/utils/parsedAndFormateDate';
import { declOfNum, isFloat } from '@/lib/utils/utlis';
import { IWorkPlace, experienceData, homeData } from '@/locales';
import { LanguageEnum } from '@/types/enums';
import parse from 'html-react-parser';

const getExperience = (workPlaces: IWorkPlace[], language: LanguageEnum) => {
  const yearsMappedValues = { ua: ['роком', 'роками', 'роками'], en: ['year', 'years', 'years'] };

  let experience = 0;

  workPlaces.forEach((workPlace) => {
    const workPlaceExperience = parsedAndFormateDate(workPlace.term, language).experience;
    experience += workPlaceExperience;
  });

  experience = Math.floor((experience / 12) * 2) / 2;

  if (isFloat(experience)) {
    experience = Number(experience.toFixed(1));
  }

  const languageExperienceWord = declOfNum(experience, yearsMappedValues[language]);

  return `${experience}+ ${languageExperienceWord}`;
};

const Content = () => {
  const { language } = useChangeLanguage();
  const title = homeData[language].title;

  const workPlaces = experienceData[language]['workPlaces'];

  const experience = getExperience(workPlaces, language);

  return (
    <DefaultLayout key={language}>
      <div>
        <h1 className="greetings-title home-greeting-title">
          <TypewriterText text={title} />
        </h1>
        <h4 className="greetings-subtitle after-typing">{homeData[language]['subtitle']}</h4>
      </div>
      <p className="greetings-text text-justify after-typing">
        {parse(homeData[language]['text'], {
          replace(domNode: any) {
            if (domNode.attribs && domNode.attribs.id === 'exp') {
              return <>{experience}</>;
            }
          },
        })}
      </p>
      <div className="button-shadow after-typing">
        <a
          target="_blank"
          href={resumeLink}
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
