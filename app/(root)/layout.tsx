"use client";
import Aside from "@/components/aside";
import BackgroundMusic from "@/components/background-music";
import Header from "@/components/header";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [playMusic, setPlayMusic] = useState(false);

  const handlePlayMusic = () => setPlayMusic((prev) => !prev);

  return (
    <div className="w-full flex">
      <BackgroundMusic playMusic={playMusic} />
      <Aside />
      <div className="flex-[0_1_50%] max-[992px]:flex-[0_0_100%] bg-black overflow-hidden">
        <div className="text-white bg-black central-text container-app">
          <Header handlePlayMusic={handlePlayMusic} playMusic={playMusic} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
