'use client';
import DefaultLayout from '@/components/default-layout';
import { useChangeLanguage } from '@/contexts/language-context';
import { projectsData } from '@/locales';
import arrowLeft from '@/public/assets/icons/arrow_left.svg';
import arrowRight from '@/public/assets/icons/arrow_right.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [tooltipTop, setTooltipTop] = useState(0);

  const sliderRefContainer = useRef<HTMLDivElement>(null);

  const [showsArrows, setShowArrows] = useState({
    showLeft: false,
    showRight: true,
  });

  const updateArrows = useCallback(() => {
    const slider = sliderRefContainer.current;
    if (!slider) return;

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const threshold = 2;

    setShowArrows({
      showLeft: slider.scrollLeft > threshold,
      showRight: slider.scrollLeft < maxScrollLeft - threshold,
    });
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [language, updateArrows]);

  const sliderClick = (side: string) => {
    const slider = sliderRefContainer.current;
    const firstCard = slider?.firstElementChild as HTMLDivElement | null;
    if (!slider || !firstCard) return;

    const extraOffset = 22;
    const distance = firstCard.clientWidth + extraOffset;

    slider.scrollBy({ left: side === 'left' ? -distance : distance, behavior: 'smooth' });
  };

  return (
    <DefaultLayout>
      <h3 className="greetings-title projects-greetings-title">
        {projectsData[language]['title']}
      </h3>
      <div className="flex flex-col justify-between flex-grow gap-4 max-lg:overflow-auto">
        <div className="projects-slider">
          <button
            type="button"
            onClick={() => sliderClick('left')}
            disabled={!showsArrows.showLeft}
            aria-label="Previous project"
          >
            <Image
              src={arrowLeft}
              alt="arrow_left"
              style={{}}
              className={!showsArrows.showLeft ? 'opacity-50' : 'hover-opacity'}
            />
          </button>
          <div className="projects-wrapper" ref={sliderRefContainer} onScroll={updateArrows}>
            {projectsData[language]['projects'].map((project, projectIndex) => (
              <div
                id={project.title}
                className={`project-card ${getBgName(project.bgName)} overflow-y-auto relative`}
                key={project.title}
                onScroll={(event) => {
                  if (showProjectTechnologies === project.title) {
                    setTooltipTop(event.currentTarget.scrollTop);
                  }
                }}
              >
                <h5>{project.title}</h5>
                <div className="flex flex-col justify-between gap-5 flex-grow">
                  <div>
                    <p>{project.description}</p>
                    <div className="relative">
                      <button
                        type="button"
                        className="technologies-trigger-name"
                        onMouseEnter={(event) => {
                          setTooltipTop(
                            event.currentTarget.closest('.project-card')?.scrollTop ?? 0,
                          );
                          setProjectTechnologies(project.title);
                        }}
                        onMouseLeave={() => setProjectTechnologies('')}
                        onFocus={(event) => {
                          setTooltipTop(
                            event.currentTarget.closest('.project-card')?.scrollTop ?? 0,
                          );
                          setProjectTechnologies(project.title);
                        }}
                        onBlur={() => setProjectTechnologies('')}
                        aria-expanded={showProjectTechnologies === project.title}
                        aria-controls={`technologies-${projectIndex}`}
                      >
                        TECHNOLOGIES
                      </button>
                    </div>
                  </div>
                  <Link href={project.link} target="_blank">
                    Web
                  </Link>
                </div>
                <ul
                  id={`technologies-${projectIndex}`}
                  className={`technologies-hidden-list ${
                    showProjectTechnologies === project.title ? 'flex' : 'hidden'
                  }`}
                  style={{
                    top: `${tooltipTop}px`,
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
          <button
            type="button"
            onClick={() => sliderClick('right')}
            disabled={!showsArrows.showRight}
            aria-label="Next project"
          >
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
        <Link
          href="https://github.com/AltPerson"
          className="project-main-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="project-main-link-button" aria-hidden="true" />
          <h6>gitHub</h6>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default Content;
