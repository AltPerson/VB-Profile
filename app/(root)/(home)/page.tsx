import { resumeLink } from '@/constants';
import { experienceData, homeData } from '@/constants/portfolio-data';
import { formatExperience, getExperienceYears } from '@/lib/utils/getExperience';
import { Metadata } from 'next';
import Content from './_components/Content';

export const metadata: Metadata = {
  title: 'VB',
};

export default async function HomePage() {
  const description = homeData.text
    .replace(
      '<span id="exp"></span>',
      formatExperience(getExperienceYears(experienceData.workPlaces)),
    )
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return (
    <>
      <Content />
      <noscript>
        <style>{`.home-personal-terminal { display: none; }`}</style>
        <main className="content-part p-6 font-rajdhani text-white">
          <h1 className="text-3xl text-redNeon">{homeData.title}</h1>
          <h2 className="text-2xl my-4">{homeData.subtitle}</h2>
          <p className="text-lg leading-relaxed">{description}</p>
          <a className="inline-block my-6 text-blueNeon underline" href={resumeLink}>
            Download resume.pdf
          </a>
          <p className="text-base">Enable JavaScript to use the interactive terminal.</p>
        </main>
      </noscript>
    </>
  );
}
