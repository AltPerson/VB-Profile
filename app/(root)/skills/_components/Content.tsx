'use client';
import DefaultLayout from '@/components/default-layout';
import { useChangeLanguage } from '@/contexts/language-context';
import { skillsData } from '@/locales';

const Content = () => {
  const { language } = useChangeLanguage();
  return (
    <DefaultLayout>
      <h3 className="greetings-title projects-greetings-title">{skillsData[language]['title']}</h3>
      <ul className="flex gap-y-9 gap-x-9 flex-wrap px-2 justify-center skills-wrapper overflow-auto overflow-x-hidden mb-5">
        {skillsData[language].skills.map((skill, index) => (
          <li
            key={index}
            style={{
              opacity: 0,
              animation: `showOpacity 1s linear forwards 1 ${index == 0 ? 0 : index / 4 + 0.1}s`,
            }}
            className="card-shape-container text-center card-shape-container-second py-[18px] px-[42px] font-rajdhani font-semibold text-base whitespace-nowrap text-blueNeon max-h-[42px] flex justify-center items-center max-w-[152px] w-[100%]"
          >
            {skill}
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
};

export default Content;
