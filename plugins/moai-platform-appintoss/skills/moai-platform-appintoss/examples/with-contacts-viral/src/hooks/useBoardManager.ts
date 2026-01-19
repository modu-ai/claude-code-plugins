import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GAME_MODE, GAME_STATE } from '@/constants/game';
import {
  buildBoard,
  calculateStats,
  checkWinCondition,
  floodFill,
  type BoardCell,
} from '@/utils/gameLogic';

export function useBoardManager(gameConfig: {
  rows: number;
  cols: number;
  minMines: number;
  maxMines: number;
}) {
  const [lives, setLives] = useState<number>(2);
  const [board, setBoard] = useState<BoardCell[][]>(() =>
    buildBoard(
      gameConfig.rows,
      gameConfig.cols,
      gameConfig.minMines,
      gameConfig.maxMines
    )
  );
  const [mode, setMode] = useState<(typeof GAME_MODE)[keyof typeof GAME_MODE]>(
    GAME_MODE.REVEAL
  );
  const [state, setState] = useState<
    (typeof GAME_STATE)[keyof typeof GAME_STATE]
  >(GAME_STATE.PLAYING);
  const [version, setVersion] = useState(0);

  const stats = useMemo(() => calculateStats(board), [board]);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setBoard(
      buildBoard(
        gameConfig.rows,
        gameConfig.cols,
        gameConfig.minMines,
        gameConfig.maxMines
      )
    );
    setMode(GAME_MODE.REVEAL);
    setState(GAME_STATE.PLAYING);
    setVersion((v) => v + 1);
  }, [gameConfig]);

  const toggleMode = useCallback(
    () =>
      setMode((m) =>
        m === GAME_MODE.REVEAL ? GAME_MODE.FLAG : GAME_MODE.REVEAL
      ),
    []
  );

  const revealAllMines = useCallback(() => {
    setBoard((prev) =>
      prev.map((row) =>
        row.map((cell) => (cell.isMine ? { ...cell, isRevealed: true } : cell))
      )
    );
  }, []);

  const checkWin = useCallback(
    (nextBoard: BoardCell[][]) => {
      if (checkWinCondition(nextBoard)) {
        setState(GAME_STATE.WON);
        setTimeout(() => revealAllMines(), 0);
      }
    },
    [revealAllMines]
  );

  const handleCellClick = useCallback(
    (cell: BoardCell) => {
      if (state !== GAME_STATE.PLAYING) {
        return;
      }
      if (cell.isRevealed) {
        return;
      }

      const isSameCell = (c: BoardCell) =>
        c.row === cell.row && c.col === cell.col && c.isRevealed === false;

      if (mode === GAME_MODE.FLAG) {
        setBoard((prev) =>
          prev.map((row) =>
            row.map((c) =>
              isSameCell(c) ? { ...c, isFlagged: !c.isFlagged } : c
            )
          )
        );
        return;
      }

      if (cell.isFlagged) {
        return;
      }

      if (cell.isMine) {
        setState(GAME_STATE.LOST);
        setLives((prev) => prev - 1);
        revealAllMines();
        return;
      }

      setBoard((prev) => {
        const next = prev.map((row) => row.map((c) => ({ ...c })));
        floodFill(next, cell.row, cell.col, gameConfig.rows, gameConfig.cols);
        checkWin(next);
        return next;
      });
    },
    [checkWin, mode, revealAllMines, state, gameConfig]
  );

  const reset = useCallback(() => {
    if (lives === 0) {
      return;
    }
    setBoard(
      buildBoard(
        gameConfig.rows,
        gameConfig.cols,
        gameConfig.minMines,
        gameConfig.maxMines
      )
    );
    setMode(GAME_MODE.REVEAL);
    setState(GAME_STATE.PLAYING);
    setVersion((v) => v + 1);
  }, [gameConfig, lives]);

  const addLife = useCallback((amount?: number) => {
    const newLife = amount || 1;
    setLives((prev) => prev + newLife);
  }, []);

  return {
    lives,
    board,
    mode,
    state,
    stats,
    version,
    handlers: {
      reset,
      toggleMode,
      handleCellClick,
      addLife,
    },
  } as const;
}
