import { useState, useEffect, createRef } from 'react';
import * as THREE from 'three';
import { generateRandomPositions } from '../utils/randomPosition';

export interface BallData {
  id: number;
  number: number;
  position: [number, number, number];
  mesh: React.RefObject<THREE.Mesh>;
}

/**
 * 공이 생성될 수 있는 x축의 전체 범위예요.
 * - 공 간 최소 간격(minDistance) * 개수(count)보다 작으면 에러가 발생해요.
 */
const BALL_SPAWN_SPREAD = 24;

/**
 * 공 사이의 최소 간격이에요.
 * - 이보다 가까우면 충돌을 피하기 어려워요.
 */
const BALL_SPAWN_MIN_DISTANCE = 1;

/**
 * 생성할 수 있는 최소 공 개수예요.
 */
const MIN_BALL_COUNT = 2;

/**
 * 생성할 수 있는 최대 공 개수예요.
 */
const MAX_BALL_COUNT = 9;

/**
 * 각 공에 고유한 ID를 부여하기 위한 전역 카운터예요.
 */
let ballIdCounter = 0;

export function useBallState() {
  const [count, setCount] = useState<number>(5);
  const [balls, setBalls] = useState<BallData[]>([]);

  useEffect(() => {
    generateBalls(count);
  }, [count]);

  const removeBall = (id: number) => {
    setBalls((prev) => prev.filter((ball) => ball.id !== id));
  };

  const incrementCount = () => {
    setCount((prev) => Math.min(prev + 1, MAX_BALL_COUNT));
  };

  const decrementCount = () => {
    setCount((prev) => Math.max(prev - 1, MIN_BALL_COUNT));
  };

  const generateBalls = (count: number) => {
    const newBalls = generateRandomPositions({
      count,
      spread: BALL_SPAWN_SPREAD,
      minDistance: BALL_SPAWN_MIN_DISTANCE,
    }).map((position, index) => ({
      id: ++ballIdCounter,
      number: index + 1,
      position,
      mesh: createRef<THREE.Mesh>(),
    }));

    setBalls(newBalls);
  };

  const resetBalls = () => {
    generateBalls(count);
  };

  return {
    balls,
    count,
    setCount,
    incrementCount,
    decrementCount,
    removeBall,
    resetBalls,
  };
}
