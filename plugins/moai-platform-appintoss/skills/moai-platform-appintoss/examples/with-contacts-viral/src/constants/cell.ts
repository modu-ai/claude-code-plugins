/**
 * 셀 종류
 */
export const CELL_KIND = {
  PIRATE_FLAG: 'pirateFlag',
  BOX: 'box',
  PIRATE: 'pirate',
  NUMBER: 'number',
  TREASURE: 'treasure',
} as const;

/**
 * 이모지 이미지 베이스 URL
 */
export const EMOJI_BASE_URL = 'https://static.toss.im/2d-emojis/png/4x/';

/**
 * 이모지 이미지 파일명
 */
export const IMAGE_NAME = {
  pirate: 'u2620.png',
  pirateFlag: 'u1F3F4_u200D_u2620_uFE0F.png',
} as const;

/**
 * 셀 종류별 라벨
 */
export const KIND_LABEL = {
  treasure: '보물',
  number: '숫자',
  box: '상자',
  pirate: '해적',
  pirateFlag: '해적 깃발',
} as const;
