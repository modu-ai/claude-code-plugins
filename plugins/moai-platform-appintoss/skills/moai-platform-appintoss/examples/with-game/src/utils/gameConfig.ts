/**
 * 게임 설정 관련 상수들
 * 게임의 구성 요소들의 기본값과 설정을 관리
 */

export const GAME_CONFIG = {
  /** 병뚜껑 관련 설정 */
  CAP: {
    /** 병뚜껑의 높이 (단위: 미터) */
    HEIGHT: 0.5,
    /** 병뚜껑의 시작 X 좌표 */
    START_X: 0,
    /** 병뚜껑의 시작 Z 좌표 - 테이블 윗면 위에 병뚜껑이 살짝 올라가게 설정 */
    START_Z: 1.25,
    /** 병뚜껑의 크기 배율 */
    SCALE: 0.3,
    /** 병뚜껑의 선형 감쇠 계수 (0~1, 1에 가까울수록 빠르게 멈춤) */
    LINEAR_DAMPING: 1,
    /** 병뚜껑의 탄성 계수 (0~1, 1에 가까울수록 많이 튀어오름) */
    RESTITUTION: 0.6,
  },
  /** 발사 힘 관련 설정 */
  FORCE: {
    /** 최소 발사 힘 */
    MIN: 0,
    /** 게이지가 초당 움직이는 속도 */
    GAUGE_SPEED: 20,
    /** 발사 힘 조정 계수 (실제 적용되는 힘 = 게이지값 * 이 계수) */
    ADJUSTMENT_FACTOR: 0.13,
  },
  /** 테이블 관련 설정 */
  TABLE: {
    /** 테이블의 초기 높이 (단위: 미터) */
    INIT_HEIGHT: 40,
    /** 테이블의 시작 Y 좌표 */
    INIT_START_Y: -20,
    /** 테이블의 끝 Y 좌표 */
    INIT_END_Y: 20,
  },
  /** 게임 로직 관련 설정 */
  GAME: {
    /** 성공 판정 기준 거리 (단위: 미터) - 이 거리 이내면 성공 */
    SUCCESS_THRESHOLD: 3,
    /** 정지 판정 기준 속도 (단위: m/s) - 이 속도 이하면 정지로 간주 */
    STOP_VELOCITY_THRESHOLD: 0.01,
    /** 떨어짐 판정 기준 Z 좌표 - 이 값보다 낮으면 떨어짐으로 간주 */
    FALL_THRESHOLD: -30,
    /** 게임 종료까지의 지연 시간 (단위: 밀리초) */
    END_DELAY: 2000,
    /** 떨어짐 상태를 나타내는 특별한 거리 값 */
    DROP_DISTANCE: -Infinity,
  },
} as const;

// 타입 추출
export type GameConfig = typeof GAME_CONFIG;
