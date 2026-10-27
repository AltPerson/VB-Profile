'use client';
import DefaultLayout from '@/components/default-layout';
import TypewriterText from '@/components/typewriter-text';
import { experienceData } from '@/constants/portfolio-data';
import { usePageEntrance } from '@/lib/hooks/usePageEntrance';
import './experience-dossier.css';
import ExperienceDossier from './ExperienceDossier';
import { useDossierViewport } from './useDossierViewport';

const Content = () => {
  const { workPlaces } = experienceData;
  const viewport = useDossierViewport();
  const entrance = usePageEntrance(500);

  return (
    <div
      className="experience-dossier"
      ref={viewport.host}
      data-layout={viewport.layout}
      {...entrance.entranceProps}
    >
      <DefaultLayout>
        <header className="experience-dossier__heading">
          <h1 className="greetings-title experience-dossier__title">
            <TypewriterText text={experienceData.title} onComplete={entrance.start} />
          </h1>
        </header>
        <ExperienceDossier workPlaces={workPlaces} compact={viewport.compact} />
      </DefaultLayout>
    </div>
  );
};

export default Content;
