import { useEffect } from 'react';
import { useAudio } from '@/hooks/useAudio';
import { GAME_STATE } from '@/constants/game';

interface SystemSoundControllerProps {
  gameState: (typeof GAME_STATE)[keyof typeof GAME_STATE];
}

/**
 * 시스템 사운드 컨트롤러
 * @param gameState - 게임 상태
 */

export function SystemSoundController({
  gameState,
}: SystemSoundControllerProps) {
  const { playAudio: playWinAudio } = useAudio({
    src: '/win.wav',
    volume: 0.3,
  });

  const { playAudio: playLostAudio } = useAudio({
    src: '/lost.wav',
    volume: 0.3,
  });

  // 게임 결과에 따른 시스템 사운드 재생
  useEffect(() => {
    if (gameState === GAME_STATE.WON) {
      playWinAudio();
    }
    if (gameState === GAME_STATE.LOST) {
      playLostAudio();
    }
  }, [gameState, playWinAudio, playLostAudio]);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
}
