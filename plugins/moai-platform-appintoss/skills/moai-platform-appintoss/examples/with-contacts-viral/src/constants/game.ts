/**
 * 게임 보드 크기
 */
export const BOARD_SIZE = {
  ROWS: 7,
  COLS: 5,
} as const;

/**
 * 난이도별 지뢰 밀도 설정 (보드 크기에 비례): [min%, max%]
 */
export const DIFFICULTY_DENSITY = {
  easy: [0.18, 0.26],
  normal: [0.34, 0.45],
  hard: [0.5, 0.65],
} as const;

/**
 * 기본 선택된 난이도
 */
export const DEFAULT_DIFFICULTY: keyof typeof DIFFICULTY_DENSITY = 'normal';

/**
 * 난이도 옵션 (enum-like) - DIFFICULTY_DENSITY에서 자동 생성
 */
export const DIFFICULTY_OPTIONS = Object.fromEntries(
  Object.keys(DIFFICULTY_DENSITY).map((key) => [key, key])
) as { [K in keyof typeof DIFFICULTY_DENSITY]: K };

/**
 * 난이도 라벨
 */
export const DIFFICULTY_LABEL = {
  easy: '쉬운',
  normal: '보통',
  hard: '어려운',
} as const;

/**
 * 게임 상태
 */
export const GAME_STATE = {
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost',
} as const;

/**
 * 게임 모드
 */
export const GAME_MODE = {
  REVEAL: 'reveal',
  FLAG: 'flag',
} as const;

/**
 * 기본 게임 설정
 */
export const DEFAULT_GAME_CONFIG = {
  ROWS: 5,
  COLS: 5,
  MIN_MINES: 5,
  MAX_MINES: 8,
} as const;
