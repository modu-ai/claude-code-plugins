import { useEffect } from 'react';
import { useAudio } from '@/hooks/useAudio';
import { GAME_STATE } from '@/constants/game';

interface BGMControllerProps {
  gameState: (typeof GAME_STATE)[keyof typeof GAME_STATE];
}

/**
 * BGM 컨트롤러
 * @param gameState - 게임 상태
 * @returns null
 */

export function BGMController({ gameState }: BGMControllerProps) {
  const { playAudio, stopAudio, fade } = useAudio({
    src: '/bgm.wav',
    loop: true,
    volume: 0.1,
  });

  // 컴포넌트 마운트 시 BGM 시작
  useEffect(() => {
    playAudio();
    return () => {
      stopAudio();
    };
  }, [playAudio, stopAudio]);

  // 게임 상태에 따른 BGM 페이드 처리
  useEffect(() => {
    if (gameState !== GAME_STATE.PLAYING) {
      fade(0.1, 0.0, 500);
      return;
    }
    fade(0.0, 0.1, 1000);
  }, [gameState, fade]);

  return null;
}
