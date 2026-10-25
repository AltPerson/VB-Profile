'use client';
import DefaultLayout from '@/components/default-layout';
import TypewriterText from '@/components/typewriter-text';
import { experienceData } from '@/constants/portfolio-data';

import WorkPlacesList from './List';

const Content = () => {
  const { workPlaces } = experienceData;

  return (
    <DefaultLayout>
      <h3 className="greetings-title experience-greetings-title">
        <TypewriterText text={experienceData['title']} />
      </h3>

      <div className="after-typing flex flex-col gap-6 overflow-auto work-place-wrapper pr-2 overflow-x-hidden">
        <WorkPlacesList workPlaces={workPlaces} />
      </div>
    </DefaultLayout>
  );
};

export default Content;
