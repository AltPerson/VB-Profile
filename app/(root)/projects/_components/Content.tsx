'use client';
import DefaultLayout from '@/components/default-layout';
import { useChangeLanguage } from '@/contexts/language-context';
import { projectsData } from '@/locales';
import arrowLeft from '@/public/assets/icons/arrow_left.svg';
import arrowRight from '@/public/assets/icons/arrow_right.svg';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

const calculateIndexDelay = (index: number) => (index === 0 ? 1 : index + 0.5);

const getBgName = (bgName: string) => {
  switch (bgName) {
    case 'projectOne':
      return 'bg-projectOne';
    case 'projectTwo':
      return 'bg-projectTwo';
    default:
      return 'bg-projectThird';
  }
};

const Content = () => {
  const { language } = useChangeLanguage();
  const [showProjectTechnologies, setProjectTechnologies] = useState('');

  const sliderRefContainer = useRef<HTMLDivElement>();

  const [showsArrows, setShowArrows] = useState({
    showLeft: false,
    showRight: true,
  });

  const showArrowsSideHandler = (side: string) => {
    if (side === 'left') {
      if (sliderRefContainer.current?.scrollLeft === 0) {
        setShowArrows((prev) => ({
          ...prev,
          showLeft: false,
        }));
      } else {
        setShowArrows((prev) => ({
          ...prev,
          showRight: true,
        }));
      }
    } else {
      if (
        sliderRefContainer.current?.scrollLeft ===
        (sliderRefContainer.current?.scrollWidth as number) -
          (sliderRefContainer.current?.clientWidth as number)
      ) {
        setShowArrows((prev) => ({
          ...prev,
          showRight: false,
        }));
      } else {
        setShowArrows((prev) => ({
          ...prev,
          showLeft: true,
        }));
      }
    }
  };

  const sliderClick = (side: string) => {
    const childNodes = sliderRefContainer?.current?.childNodes[0] as HTMLDivElement;
    const extraOffset = 22;

    if (side === 'left') {
      (sliderRefContainer.current as HTMLDivElement).scrollLeft -=
        childNodes.clientWidth + extraOffset;
    } else {
      (sliderRefContainer.current as HTMLDivElement).scrollLeft +=
        childNodes.clientWidth + extraOffset;
    }

    showArrowsSideHandler(side);
  };

  let scrollTop = 0;

  if (typeof document !== 'undefined') {
    const element = document.getElementById(showProjectTechnologies);
    scrollTop = element?.scrollTop || 0;
  }

  return (
    <DefaultLayout>
      <h3 className="greetings-title projects-greetings-title">
        {projectsData[language]['title']}
      </h3>
      <div
        className="flex flex-col justify-between flex-grow gap-4 max-lg:overflow-auto"
        onWheel={(event) => {
          const side = event.deltaX > 0 ? 'right' : 'left';

          showArrowsSideHandler(side);
        }}
      >
        <div className="projects-slider">
          <button onClick={() => sliderClick('left')} disabled={!showsArrows.showLeft}>
            <Image
              src={arrowLeft}
              alt="arrow_left"
              style={{}}
              className={!showsArrows.showLeft ? 'opacity-50' : 'hover-opacity'}
            />
          </button>
          <div
            className="projects-wrapper"
            ref={sliderRefContainer as React.MutableRefObject<HTMLDivElement>}
          >
            {projectsData[language]['projects'].map((project) => (
              <div
                id={project.title}
                className={`project-card ${getBgName(project.bgName)} overflow-y-auto relative`}
                key={project.title}
              >
                <h5>{project.title}</h5>
                <div className="flex flex-col justify-between gap-5 flex-grow">
                  <div>
                    <p>{project.description}</p>
                    <div className="relative">
                      <p
                        id="trigger-tooltip"
                        className="technologies-trigger-name"
                        onMouseEnter={() => setProjectTechnologies(project.title)}
                        onMouseLeave={() => setProjectTechnologies('')}
                      >
                        TECHNOLOGIES
                      </p>
                    </div>
                  </div>
                  <Link href={project.link} target="_blank">
                    Web
                  </Link>
                </div>
                <ul
                  id="tooltip-text"
                  className={`technologies-hidden-list ${
                    showProjectTechnologies === project.title ? 'flex' : 'hidden'
                  }`}
                  style={{
                    top: scrollTop + 'px',
                  }}
                >
                  {project.technologies.map((technology, index) => (
                    <li
                      id="tooltip-text-item"
                      key={index}
                      className="card-shape-container px-3 py-1 w-fit font-bold"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={() => sliderClick('right')} disabled={!showsArrows.showRight}>
            <Image
              src={arrowRight}
              alt="arrow_right"
              className={!showsArrows.showRight ? 'opacity-50' : 'hover-opacity'}
            />
          </button>
        </div>
        <div className="projects-list">
          {projectsData[language]['projects'].map((project, index) => (
            <div
              className="project-card overflow-auto"
              key={project.title}
              style={{
                animation: `slide-from-right 0.5s linear forwards 1 ${calculateIndexDelay(index)}s`,
              }}
            >
              <h5>{project.title}</h5>
              <div className="flex flex-col justify-between gap-3 flex-grow">
                <div>
                  <p>{project.description}</p>
                  <ul className="flex gap-2 mt-2 flex-wrap">
                    {project.technologies.map((technology, index) => (
                      <li
                        key={index}
                        className="card-shape-container px-3 py-1 w-fit whitespace-nowrap font-bold text-base max-md:text-sm max-sm:text-xs bg-cyan-950"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={project.link} target="_blank">
                  Web
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link href="https://github.com/AltPerson" className="project-main-link" target="_blank">
          <button className="project-main-link-button" />
          <h6>gitHub</h6>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default Content;
