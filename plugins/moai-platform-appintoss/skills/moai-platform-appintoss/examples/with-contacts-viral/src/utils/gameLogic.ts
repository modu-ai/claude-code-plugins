import { clamp, pickRandomInt, shuffleArray } from '@/utils/math';
import { DIRECTION_8 } from '@/constants/directions';
import { CELL_KIND } from '@/constants/cell';
import { GAME_STATE } from '@/constants/game';

export type BoardCell = {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacent: number;
};

/**
 * 빈 게임 보드를 생성합니다.
 * @param rows - 행 수
 * @param cols - 열 수
 * @returns 빈 보드
 */
export function createEmptyBoard(rows: number, cols: number): BoardCell[][] {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacent: 0,
    }))
  );
}

/**
 * 지뢰를 보드에 배치하고 주변 셀의 adjacent 값을 업데이트합니다.
 * @param board - 게임 보드
 * @param mineCount - 지뢰 개수
 * @param cols - 열 수
 * @param rows - 행 수
 */
export function placeMinesAndUpdateAdjacent(
  board: BoardCell[][],
  mineCount: number,
  cols: number,
  rows: number
): void {
  const total = rows * cols;
  const indices = Array.from({ length: total }, (_, i) => i);
  shuffleArray(indices);

  const mines = new Set(indices.slice(0, mineCount));

  // 지뢰를 배치하면서 동시에 주변 셀들의 adjacent 값을 업데이트
  for (const idx of mines) {
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    board[r][c].isMine = true;

    // 이 지뢰 주변의 8개 셀의 adjacent 값을 증가
    for (const [dr, dc] of DIRECTION_8) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        // 미리 계산한 지뢰 집합을 사용해, 이웃이 지뢰인 경우는 제외하고 증가
        const neighborIdx = nr * cols + nc;
        if (mines.has(neighborIdx) === false) {
          board[nr][nc].adjacent++;
        }
      }
    }
  }
}

/**
 * 게임 보드를 생성합니다.
 * @param rows - 행 수
 * @param cols - 열 수
 * @param minMines - 최소 지뢰 수
 * @param maxMines - 최대 지뢰 수
 * @returns 생성된 게임 보드
 */
export function buildBoard(
  rows: number,
  cols: number,
  minMines: number,
  maxMines: number
): BoardCell[][] {
  const total = rows * cols;
  const mineCount = clamp(pickRandomInt(minMines, maxMines), 1, total - 1);

  const board = createEmptyBoard(rows, cols);
  placeMinesAndUpdateAdjacent(board, mineCount, cols, rows);

  return board;
}

/**
 * 게임 통계를 계산합니다.
 * @param board - 게임 보드
 * @returns 게임 통계
 */
export function calculateStats(board: BoardCell[][]): {
  totalMines: number;
  totalSafe: number;
  revealedSafe: number;
  flags: number;
} {
  let totalMines = 0;
  let revealedSafe = 0;
  let totalSafe = 0;
  let flags = 0;

  for (const row of board) {
    for (const cell of row) {
      if (cell.isMine) {
        totalMines++;
      } else {
        totalSafe++;
        if (cell.isRevealed) {
          revealedSafe++;
        }
      }
      if (cell.isFlagged) {
        flags++;
      }
    }
  }

  return { totalMines, totalSafe, revealedSafe, flags };
}

/**
 * 게임 승리 조건을 확인합니다.
 * @param board - 게임 보드
 * @returns 승리 여부
 */
export function checkWinCondition(board: BoardCell[][]): boolean {
  let safe = 0;
  let revealed = 0;

  for (const row of board) {
    for (const cell of row) {
      if (cell.isMine === false) {
        safe++;
        if (cell.isRevealed) {
          revealed++;
        }
      }
    }
  }

  return safe > 0 && safe === revealed;
}

/**
 * 셀의 종류를 결정합니다.
 * @param cell - 게임 셀
 * @returns 셀의 종류
 */
export function getCellKind(
  cell: BoardCell,
  options?: { gameState?: (typeof GAME_STATE)[keyof typeof GAME_STATE] }
): (typeof CELL_KIND)[keyof typeof CELL_KIND] {
  if (cell.isRevealed === false) {
    return cell.isFlagged ? CELL_KIND.PIRATE_FLAG : CELL_KIND.BOX;
  }

  if (cell.isMine) {
    // 승리 시 공개된 지뢰는 보석으로 표시
    if (options?.gameState === GAME_STATE.WON) {
      return CELL_KIND.TREASURE;
    }
    return CELL_KIND.PIRATE;
  }

  return cell.adjacent > 0 ? CELL_KIND.NUMBER : CELL_KIND.TREASURE;
}

/**
 * 주변 셀들을 자동으로 열어주는 flood fill 함수입니다.
 * 지뢰찾기의 원래 룰에 따라, 주변 8개 셀이 모두 지뢰가 아닐 때 자동으로 주변 셀들을 엽니다.
 * @param board - 게임 보드
 * @param startRow - 시작 행
 * @param startCol - 시작 열
 * @param rows - 전체 행 수
 * @param cols - 전체 열 수
 */
export function floodFill(
  board: BoardCell[][],
  startRow: number,
  startCol: number,
  rows: number,
  cols: number
): void {
  const queue: [number, number][] = [[startRow, startCol]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;
    const key = `${row},${col}`;

    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    const cell = board[row][col];

    // 이미 열려있거나 플래그가 있으면 건너뛰기
    if (cell.isRevealed || cell.isFlagged) {
      continue;
    }

    // 셀을 열기
    cell.isRevealed = true;

    // 주변에 지뢰가 있으면 주변 셀들을 열지 않음
    if (cell.adjacent !== 0) {
      continue;
    }

    // 주변에 지뢰가 없으면 (TREASURE 셀이면) 주변 셀들도 열기
    for (const [dr, dc] of DIRECTION_8) {
      const nr = row + dr;
      const nc = col + dc;

      // 경계 체크
      const isOutOfBounds = nr < 0 || nr >= rows || nc < 0 || nc >= cols;
      if (isOutOfBounds) {
        continue;
      }

      const neighbor = board[nr][nc];

      // 아직 열리지 않았고 플래그가 없는 셀만 큐에 추가
      const canAddToQueue =
        neighbor.isRevealed === false && neighbor.isFlagged === false;
      if (canAddToQueue) {
        queue.push([nr, nc]);
      }
    }
  }
}
