import { useEffect } from 'react';
import { useAudio } from '@/hooks/useAudio';

interface BGMProps {
  isGameEnd: boolean;
}

export function BGM({ isGameEnd }: BGMProps) {
  const { playAudio, stopAudio, fade } = useAudio({
    src: '/bgm.wav',
    loop: true,
    volume: 0.1,
  });

  useEffect(() => {
    playAudio();
    return () => {
      stopAudio();
    };
  }, [playAudio, stopAudio]);

  useEffect(() => {
    if (isGameEnd) {
      fade(0.1, 0.0, 1500);
      return;
    }
    fade(0.0, 0.1, 1500);
  }, [isGameEnd, fade]);

  return null;
}
