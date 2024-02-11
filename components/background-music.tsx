"use client";
import React, { useEffect } from "react";

interface Props {
  playMusic: boolean;
}

const BackgroundMusic = ({ playMusic }: Props) => {
  useEffect(() => {
    const player = document.getElementsByClassName(
      "audio-element",
    )[0] as HTMLAudioElement;

    if (playMusic) {
      player.volume = 0.3;
      player.play();
      player.muted = false;
    } else {
      player.muted = true;
    }
  }, [playMusic]);
  return (
    <>
      <audio className="audio-element" loop>
        <source src="/music/bg-song.weba" />
      </audio>
    </>
  );
};

export default BackgroundMusic;
