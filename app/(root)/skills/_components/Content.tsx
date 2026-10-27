'use client';
import DefaultLayout from '@/components/default-layout';
import TypewriterText from '@/components/typewriter-text';
import { skillsData } from '@/constants/portfolio-data';
import { domAnimation, LazyMotion } from 'motion/react';
import SkillsMatrix from './SkillsMatrix';
import './skills-matrix.css';

const Content = () => {
  return (
    <div className="skills-matrix">
      <DefaultLayout>
        <div className="skills-matrix__workspace">
          <h1 className="greetings-title projects-greetings-title">
            <TypewriterText text={skillsData['title']} />
          </h1>
          <LazyMotion features={domAnimation} strict>
            <SkillsMatrix />
          </LazyMotion>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Content;
