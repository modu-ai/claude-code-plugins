import { useEffect } from 'react';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import type { GameStatus } from '../../hooks/useGameStatus';

interface GameEndTimerProps {
  ballsLength: number;
  finishedBalls: number[];
  gameStatus: GameStatus;
  onCount: (time: number) => void;
  onEnd: () => void;
  duration?: number;
}

export function GameEndTimer({
  ballsLength,
  finishedBalls,
  gameStatus,
  onCount,
  onEnd,
  duration = 10,
}: GameEndTimerProps) {
  const { startCountdown, resetCountdown, isCountingDown } = useCountdownTimer({
    duration,
    onCount,
    onEnd,
  });

  useEffect(() => {
    if (ballsLength === 0 && finishedBalls.length > 0) {
      resetCountdown();
      onEnd();
    }
  }, [ballsLength, finishedBalls]);

  useEffect(() => {
    if (finishedBalls.length > 0 && !isCountingDown) {
      startCountdown();
    }
  }, [finishedBalls]);

  useEffect(() => {
    resetCountdown();
  }, [gameStatus]);

  return null;
}
