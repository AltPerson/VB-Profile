'use client';
import DefaultLayout from '@/components/default-layout';
import { useChangeLanguage } from '@/contexts/language-context';
import { parsedAndFormateDate } from '@/lib/utils/parsedAndFormateDate';
import { isFloat } from '@/lib/utils/utlis';
import { experienceData, homeData, IWorkPlace } from '@/locales';
import { LanguageEnum } from '@/types/enums';
import parse from 'html-react-parser';

const getExperience = (workPlaces: IWorkPlace[], language: LanguageEnum) => {
  const yearsMappedValues = {
    ua: 'років',
    en: 'years',
  };

  let experience = 0;

	let asd = 0;

  workPlaces.forEach((workPlace) => {
    const workPlaceExperience = parsedAndFormateDate(workPlace.term, language).experience;
    experience += workPlaceExperience;
  });

  experience /= 12;

  return `${isFloat(experience) ? experience.toFixed(1) : experience} ${yearsMappedValues[language]}`;
};

const Content = () => {
  const { language } = useChangeLanguage();

  const workPlaces = experienceData[language]['workPlaces'];

  const experience = getExperience(workPlaces, language);

  return (
    <DefaultLayout>
      <div>
        <h1 className="greetings-title home-greeting-title">{homeData[language]['title']}</h1>
        <h4 className="greetings-subtitle">{homeData[language]['subtitle']}</h4>
      </div>
      <p className="greetings-text text-justify">
        {parse(homeData[language]['text'], {
          replace(domNode: any) {
            if (domNode.attribs && domNode.attribs.id === 'exp') {
              return <>{experience}</>;
            }
          },
        })}
      </p>
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
