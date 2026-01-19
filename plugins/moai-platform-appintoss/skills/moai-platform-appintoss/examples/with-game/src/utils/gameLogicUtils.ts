import {
  VELOCITY_THRESHOLD_SQUARED,
  STOP_VELOCITY_THRESHOLD_SQUARED,
  FALL_THRESHOLD,
  DISTANCE_UPDATE_THRESHOLD,
  SHOT_DETECTION_DELAY,
  GAME_END_DELAY,
} from './gameConstants';
import { GAME_CONFIG } from '@/utils/gameConfig';

/**
 * 게임 결과 타입
 */
export type GameResult = 'drop' | 'miss' | 'success' | 'unknown';

/**
 * 게임 결과를 반환하는 함수
 * @param distance 현재 거리
 * @returns 게임 결과
 */
export const getGameResult = (distance: number): GameResult => {
  if (distance === GAME_CONFIG.GAME.DROP_DISTANCE) {
    return 'drop';
  }

  if (distance > GAME_CONFIG.GAME.SUCCESS_THRESHOLD) {
    return 'miss';
  }

  if (distance >= 0 && distance <= GAME_CONFIG.GAME.SUCCESS_THRESHOLD) {
    return 'success';
  }

  return 'unknown';
};

/**
 * 발사 감지 로직
 * @param linvel 선형 속도
 * @param hasShot 이미 발사했는지 여부
 * @param setHasShot 발사 상태 설정 함수
 * @param lastShotTimeRef 발사 시간 참조
 */
export const detectShot = (
  linvel: { x: number; y: number; z: number },
  hasShot: boolean,
  setHasShot: (hasShot: boolean) => void,
  lastShotTimeRef: React.MutableRefObject<number>
) => {
  if (
    linvel &&
    linvel.y * linvel.y > VELOCITY_THRESHOLD_SQUARED &&
    hasShot === false
  ) {
    setHasShot(true);
    lastShotTimeRef.current = Date.now();
  }
};

/**
 * 멈춤 감지 로직
 * @param linvel 선형 속도
 * @param capY 병뚜껑 Y 위치
 * @param hasShot 발사했는지 여부
 * @param lastShotTimeRef 발사 시간 참조
 * @param stoppedTimeRef 정지 상태 참조
 * @param endTimerRef 종료 타이머 참조
 * @param tableEndY 테이블 끝 Y 위치
 * @param setDistanceToEnd 거리 설정 함수
 * @param setIsGameEnd 게임 종료 설정 함수
 */
export const detectStop = (
  linvel: { x: number; y: number; z: number },
  capY: number,
  hasShot: boolean,
  lastShotTimeRef: React.MutableRefObject<number>,
  stoppedTimeRef: React.MutableRefObject<boolean>,
  endTimerRef: React.MutableRefObject<NodeJS.Timeout | null>,
  tableEndY: number,
  setDistanceToEnd: (distance: number) => void,
  setIsGameEnd: (isGameEnd: boolean) => void
) => {
  const timeSinceShot = Date.now() - lastShotTimeRef.current;
  const isStopped =
    hasShot &&
    timeSinceShot > SHOT_DETECTION_DELAY &&
    linvel &&
    linvel.x * linvel.x < STOP_VELOCITY_THRESHOLD_SQUARED &&
    linvel.y * linvel.y < STOP_VELOCITY_THRESHOLD_SQUARED &&
    linvel.z * linvel.z < STOP_VELOCITY_THRESHOLD_SQUARED;

  if (isStopped && !stoppedTimeRef.current) {
    stoppedTimeRef.current = true;

    // 즉시 최종 거리 설정 (타이머 전에)
    const finalDistanceToEnd = Math.abs(tableEndY - capY);
    setDistanceToEnd(finalDistanceToEnd);

    endTimerRef.current = setTimeout(() => {
      setIsGameEnd(true);
    }, GAME_END_DELAY);
  }
};

/**
 * 떨어짐 감지 로직
 * @param capZ 병뚜껑 Z 위치
 * @param hasShot 발사했는지 여부
 * @param isGameEnd 게임이 끝났는지 여부
 * @param endTimerRef 종료 타이머 참조
 * @param setDistanceToEnd 거리 설정 함수
 * @param setIsGameEnd 게임 종료 설정 함수
 */
export const detectFall = (
  capZ: number,
  hasShot: boolean,
  isGameEnd: boolean,
  endTimerRef: React.MutableRefObject<NodeJS.Timeout | null>,
  setDistanceToEnd: (distance: number) => void,
  setIsGameEnd: (isGameEnd: boolean) => void
) => {
  const isFailure = capZ < FALL_THRESHOLD;

  if (isFailure && hasShot && isGameEnd === false) {
    // 기존 타이머가 있다면 취소
    if (endTimerRef.current) {
      clearTimeout(endTimerRef.current);
      endTimerRef.current = null;
    }

    setDistanceToEnd(-Infinity); // Drop 상태로 설정
    setIsGameEnd(true);
  }
};

/**
 * 거리 업데이트 로직 (불필요한 상태 업데이트 방지)
 * @param capY 병뚜껑 Y 위치
 * @param isGameEnd 게임이 끝났는지 여부
 * @param distanceToEnd 현재 거리
 * @param tableEndY 테이블 끝 Y 위치
 * @param lastDistanceRef 이전 거리 참조
 * @param setDistanceToEnd 거리 설정 함수
 */
export const updateDistance = (
  capY: number,
  isGameEnd: boolean,
  distanceToEnd: number,
  tableEndY: number,
  lastDistanceRef: React.MutableRefObject<number>,
  setDistanceToEnd: (distance: number) => void
) => {
  // 게임이 끝났거나 이미 특별한 상태면 업데이트하지 않음
  if (isGameEnd || distanceToEnd === -Infinity) {
    return;
  }

  const newDistanceToEnd = Math.abs(tableEndY - capY);

  // 이전 거리와 비교하여 임계값 이상 차이가 있을 때만 업데이트
  if (
    Math.abs(newDistanceToEnd - lastDistanceRef.current) >
    DISTANCE_UPDATE_THRESHOLD
  ) {
    lastDistanceRef.current = newDistanceToEnd;
    setDistanceToEnd(newDistanceToEnd);
  }
};
