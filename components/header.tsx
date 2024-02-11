"use client";
import { links } from "@/constants";
import { useChangeLanguage } from "@/contexts/language-context";
import { classNames } from "@/lib/utils/classnames";
import { linksData, settingsHint } from "@/locales";
import { ILink } from "@/types/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { clearTimeout } from "timers";

interface Props {
  playMusic: boolean;
  handlePlayMusic: () => void;
}

const Header = ({ handlePlayMusic, playMusic }: Props) => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleShowModal = () => setShowModal((prev) => !prev);

  const { language, toggleLanguage } = useChangeLanguage();

  console.log("Language", language);
  useEffect(() => {
    const timerInit = setTimeout(() => {
      setShowHint(true);
    }, 2500);
    const timerEnd = setTimeout(() => {
      setShowHint(false);
    }, 4500);
    return () => {
      clearTimeout(timerInit);
      clearTimeout(timerEnd);
    };
  }, []);

  return (
    <header className="min-h-[80px] flex justify-center items-center w-full header-block">
      <nav className="flex justify-between items-center w-full">
        <Link href="/" className="logo-title">
          VB
        </Link>
        <ul className="flex justify-around items-center gap-[8%]">
          {links.map((link: ILink) => (
            <li key={link.path}>
              <Link href={link.path} className="link-text hover-opacity">
                {linksData[language][link.label]}
              </Link>
            </li>
          ))}
        </ul>
        <div className="h-full flex justify-end items-center relative">
          <div
            className={classNames(
              "settings-hint absolute min-w-[380px] max-sm:min-w-[250px] z-[5] font-sans font-normal border-white border-solid border-[2px] bg-slate-900 p-[5px] top-[80%] right-[80%]",
              showHint ? "settings-hint-active" : "",
            )}>
            {settingsHint[language]}
          </div>
          <button
            onClick={handleShowModal}
            className="settings-button w-[20px] h-[20px] hover-opacity"
          />
          <div
            className={`absolute right-[150%] bg-linear-gradient p-[1px] settings-modal ${
              showModal && "settings-modal-active"
            }`}>
            <div className="bg-black flex p-3 gap-[10px] font-agencyFb text-[1.25em] justify-center items-center">
              <button
                onClick={handlePlayMusic}
                className={`${
                  playMusic ? "bg-onMusic" : "bg-offMusic"
                } w-[20px] min-h-[20px] bg-button-common h-full hover-opacity`}
              />
              <button
                onClick={toggleLanguage}
                className="w-[30px] min-h-[20px] bg-language bg-button-common h-full hover-opacity"
              />
              <span className="text-grayLight w-[16px] text-[1.0625em] uppercase">
                {language}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
