import { useEffect, useRef } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { useGameStateStore } from '@/store/gameStateStore';
import { useShallow } from 'zustand/react/shallow';
import { useGameCenterScore } from '@/hooks/useGameCenterScore';
import { useAudio } from '@/hooks/useAudio';
import { ShootButton } from '@/components/ShootButton';
import { ReplayButton } from '@/components/ReplayButton';
import { RankButton } from '@/components/RankButton';
import { getGameResult } from '@/utils/gameLogicUtils';

interface GameControllerProps {
  capRef: React.RefObject<RapierRigidBody | null>;
}

export const GameController = ({ capRef }: GameControllerProps) => {
  const { isGameEnd, distanceToEnd, hasShot, resetGameState } =
    useGameStateStore(
      useShallow((state) => ({
        isGameEnd: state.isGameEnd,
        distanceToEnd: state.distanceToEnd,
        hasShot: state.hasShot,
        resetGameState: state.resetGameState,
      }))
    );

  const isDrop = getGameResult(distanceToEnd) === 'drop';
  const prevIsGameEndRef = useRef<boolean>(false);

  const { loading } = useGameCenterScore({
    score: distanceToEnd,
    isGameEnd,
  });

  const { playAudio: playMissAudio } = useAudio({
    src: '/miss-sound.wav',
    volume: 0.2,
  });

  const { playAudio: playScoreAudio } = useAudio({
    src: '/score-sound.wav',
    volume: 0.2,
  });

  useEffect(() => {
    if (prevIsGameEndRef.current === false && isGameEnd) {
      const result = getGameResult(distanceToEnd);

      if (result === 'drop' || result === 'miss') {
        playMissAudio();
      } else if (result === 'success') {
        playScoreAudio();
      }
    }
    prevIsGameEndRef.current = isGameEnd;
  }, [isGameEnd, distanceToEnd, playMissAudio, playScoreAudio]);

  return (
    <div className="game-ui">
      <ShootButton capRef={capRef} />
      <div className="game-end-container">
        <div className="game-score" style={{ opacity: hasShot ? 1 : 0 }}>
          {isDrop ? 'Drop' : `${distanceToEnd.toFixed(1)}m`}
        </div>
        <div className="game-end-buttons">
          <ReplayButton
            isGameEnd={isGameEnd}
            loading={loading}
            resetGameState={resetGameState}
          />
          <RankButton
            isGameEnd={isGameEnd}
            isDrop={isDrop}
            loading={loading}
            resetGameState={resetGameState}
          />
        </div>
      </div>
      <div
        className="game-overlay"
        style={{ opacity: isGameEnd ? 1 : 0 }}
      ></div>
    </div>
  );
};
