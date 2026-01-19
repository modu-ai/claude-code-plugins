import { GAME_CONFIG } from '@/utils/gameConfig';

/**
 * 게임 물리/로직 관련 상수들
 * 게임의 물리 계산과 로직 처리에 필요한 상수들을 관리
 */

/** 발사 감지를 위한 속도 임계값 (단위: m/s) */
export const VELOCITY_THRESHOLD = 1;
/** 발사 감지를 위한 속도 임계값의 제곱 (성능 최적화용) */
export const VELOCITY_THRESHOLD_SQUARED =
  VELOCITY_THRESHOLD * VELOCITY_THRESHOLD;

/** 정지 판정을 위한 속도 임계값 (단위: m/s) */
export const STOP_VELOCITY_THRESHOLD = GAME_CONFIG.GAME.STOP_VELOCITY_THRESHOLD;
/** 정지 판정을 위한 속도 임계값의 제곱 (성능 최적화용) */
export const STOP_VELOCITY_THRESHOLD_SQUARED =
  STOP_VELOCITY_THRESHOLD * STOP_VELOCITY_THRESHOLD;

/** 떨어짐 판정을 위한 Z 좌표 임계값 */
export const FALL_THRESHOLD = GAME_CONFIG.GAME.FALL_THRESHOLD;

/** 거리 업데이트 임계값 (단위: 미터) - 이 값 이상 차이가 있을 때만 거리 업데이트 */
export const DISTANCE_UPDATE_THRESHOLD = 0.1;

/** 발사 후 멈춤 감지까지의 지연 시간 (단위: 밀리초) */
export const SHOT_DETECTION_DELAY = 1000;
/** 멈춤 감지 후 게임 종료까지의 지연 시간 (단위: 밀리초) */
export const GAME_END_DELAY = GAME_CONFIG.GAME.END_DELAY;

/** 성공 판정 기준 거리 (단위: 미터) */
export const SUCCESS_THRESHOLD = GAME_CONFIG.GAME.SUCCESS_THRESHOLD;
/** 떨어짐 상태를 나타내는 특별한 거리 값 */
export const DROP_DISTANCE = GAME_CONFIG.GAME.DROP_DISTANCE;
