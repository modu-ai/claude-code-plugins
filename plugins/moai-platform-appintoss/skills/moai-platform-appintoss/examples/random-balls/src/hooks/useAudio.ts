import { useRef } from 'react';

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement>(new Audio(src));

  const play = () => {
    audioRef.current.play();
  };
  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return { play, stop };
}
