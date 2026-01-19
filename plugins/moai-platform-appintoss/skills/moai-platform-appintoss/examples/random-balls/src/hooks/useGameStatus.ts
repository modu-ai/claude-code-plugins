import { useState } from 'react';

export const GAME_STATUS = {
  READY: 'ready',
  PLAYING: 'playing',
  RANKING: 'ranking',
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

interface UseGameStatusProps {
  resetBalls: () => void;
  resetFinishedBalls: () => void;
}

export function useGameStatus({
  resetBalls,
  resetFinishedBalls,
}: UseGameStatusProps) {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GAME_STATUS.READY);

  const isPlaying = gameStatus === GAME_STATUS.PLAYING;

  const startGame = () => {
    setGameStatus(GAME_STATUS.PLAYING);
  };

  const resetGame = () => {
    resetBalls();
    resetFinishedBalls();
    setGameStatus(GAME_STATUS.READY);
  };

  const endGame = () => {
    setGameStatus(GAME_STATUS.RANKING);
  };

  return {
    gameStatus,
    isPlaying,
    startGame,
    endGame,
    resetGame,
  };
}
