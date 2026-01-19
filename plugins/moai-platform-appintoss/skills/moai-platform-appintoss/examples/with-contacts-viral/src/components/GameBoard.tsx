import { generateHapticFeedback } from '@apps-in-toss/web-framework';
import { useAudio } from '@/hooks/useAudio';
import { GAME_STATE } from '@/constants/game';
import { CELL_KIND } from '@/constants/cell';
import { getCellKind } from '@/utils/gameLogic';
import type { BoardCell } from '@/utils/gameLogic';
import { Cell } from '@/components/Cell';
import type { CSSProperties } from 'react';

interface GameBoardProps {
  board: BoardCell[][];
  state: (typeof GAME_STATE)[keyof typeof GAME_STATE];
  dims: { rows: number; cols: number };
  version: number;
  onCellClick: (cell: BoardCell) => void;
}

/**
 * 게임 보드
 * @param board - 보드
 * @param state - 게임 상태
 * @param dims - 보드 차원
 * @param version - 보드 버전
 * @param onCellClick - 셀 클릭 이벤트
 */

export function GameBoard({
  board,
  state,
  dims,
  version,
  onCellClick,
}: GameBoardProps) {
  const { playAudio } = useAudio({
    src: '/flip.wav',
    volume: 0.4,
  });

  const gridStyle: CSSProperties & { ['--cols']?: number } = {
    ['--cols']: dims.cols,
  };

  return (
    <div className="minesweeper-grid" key={`grid-${version}`} style={gridStyle}>
      {board.flat().map((cell) => {
        const kind = getCellKind(cell, { gameState: state });
        const cellIndex = cell.row * dims.cols + cell.col;
        const isDisabled = state !== GAME_STATE.PLAYING || cell.isRevealed;
        const adjacentMines =
          kind === CELL_KIND.NUMBER ? cell.adjacent : undefined;

        return (
          <Cell
            key={`${version}-${cell.row}-${cell.col}`}
            kind={kind}
            ariaLabel={`행:${cell.row},열:${cell.col}`}
            onClick={() => {
              onCellClick(cell);
              generateHapticFeedback({
                type: 'basicMedium',
              });
              playAudio();
            }}
            index={cellIndex}
            disabled={isDisabled}
            adjacentMines={adjacentMines}
            isRevealed={cell.isRevealed}
            isFlagged={cell.isFlagged}
          />
        );
      })}
    </div>
  );
}
