'use client';
import DefaultLayout from '@/components/default-layout';
import TypewriterText from '@/components/typewriter-text';
import { useChangeLanguage } from '@/contexts/language-context';
import { experienceData } from '@/locales';

import WorkPlacesList from './List';

const Content = () => {
  const { language } = useChangeLanguage();
  const { workPlaces } = experienceData[language];

  return (
    <DefaultLayout key={language}>
      <h3 className="greetings-title experience-greetings-title">
        <TypewriterText text={experienceData[language]['title']} />
      </h3>

      <div className="after-typing flex flex-col gap-6 overflow-auto work-place-wrapper pr-2 overflow-x-hidden">
        <WorkPlacesList workPlaces={workPlaces} />
      </div>
    </DefaultLayout>
  );
};

export default Content;
