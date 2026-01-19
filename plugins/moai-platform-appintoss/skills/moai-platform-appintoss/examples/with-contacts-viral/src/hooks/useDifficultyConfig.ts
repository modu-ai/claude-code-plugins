import { useMemo, useState } from 'react';
import {
  BOARD_SIZE,
  DIFFICULTY_DENSITY,
  DEFAULT_DIFFICULTY,
} from '@/constants/game';

export interface GameConfig {
  rows: number;
  cols: number;
  minMines: number;
  maxMines: number;
  total: number;
}

export function useDifficultyConfig() {
  const [difficulty, setDifficulty] =
    useState<keyof typeof DIFFICULTY_DENSITY>(DEFAULT_DIFFICULTY);

  const gameConfig: GameConfig = useMemo(() => {
    const { ROWS: rows, COLS: cols } = BOARD_SIZE;
    const total = rows * cols;
    const [minPct, maxPct] = DIFFICULTY_DENSITY[difficulty];
    const minMines = Math.max(1, Math.floor(total * minPct));
    const maxMines = Math.min(
      total - 1,
      Math.max(minMines + 1, Math.floor(total * maxPct))
    );

    return { rows, cols, minMines, maxMines, total };
  }, [difficulty]);

  return {
    difficulty,
    setDifficulty,
    gameConfig,
  } as const;
}
