'use client';
import DefaultLayout from '@/components/default-layout';
import { useChangeLanguage } from '@/contexts/language-context';
import { experienceData } from '@/locales';

import WorkPlacesList from './List';

const Content = () => {
  const { language } = useChangeLanguage();

  return (
    <DefaultLayout>
      <h3 className="greetings-title experience-greetings-title">
        {experienceData[language]['title']}
      </h3>

      <div className="flex flex-col gap-6 overflow-auto work-place-wrapper pr-2 overflow-x-hidden">
        <WorkPlacesList workPlaces={experienceData[language]['workPlaces']} />
      </div>
    </DefaultLayout>
  );
};

export default Content;
