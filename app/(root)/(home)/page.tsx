"use client";
import { useChangeLanguage } from "@/contexts/language-context";
import { homeData } from "@/locales";
import { LanguageEnum } from "@/types/enums";
import parse from "html-react-parser";
import React from "react";

const Home = () => {
  const { language } = useChangeLanguage();
  return (
    <main className="max-[992px]:central-text max-[992px]:p-[2px] content-part">
      <div className="pt-[15%] max-[992px]:central-bg-mobile-0 h-full">
        <h3 className="greetings-title">{homeData[language]["title"]}</h3>
        <h4 className="greetings-subtitle">{homeData[language]["subtitle"]}</h4>
        <p className="greetings-text text-justify my-[40px]">
          {parse(homeData[language]["text"])}
        </p>
        <div className="button-shadow">
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1i1sQm6dMhN5_KwdRiunn7O2d7OqPwZHy/view?usp=sharing"
            className={`bg-aureolin button-text button-clip-path ${
              language === LanguageEnum.ENGLISH
                ? "max-w-[220px]"
                : "max-w-[335px]"
            } text-left p-[14px] border-r-[2px] border-red-600 button-bg hover-opacity block`}>
            {homeData[language]["buttonText"]}
          </a>
        </div>
      </div>
    </main>
  );
};

export default Home;
