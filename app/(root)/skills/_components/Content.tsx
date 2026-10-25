'use client';
import DefaultLayout from '@/components/default-layout';
import TypewriterText from '@/components/typewriter-text';
import { skillsData } from '@/constants/portfolio-data';
import SkillsMatrix from './SkillsMatrix';
import './skills-matrix.css';

const Content = () => {
  return (
    <div className="skills-matrix">
      <DefaultLayout>
        <div className="skills-matrix__workspace">
          <h3 className="greetings-title projects-greetings-title">
            <TypewriterText text={skillsData['title']} />
          </h3>
          <SkillsMatrix />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Content;
