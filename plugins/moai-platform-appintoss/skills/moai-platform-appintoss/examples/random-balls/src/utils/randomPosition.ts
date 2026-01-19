import * as THREE from 'three';

interface GenerateRandomPositionParams {
  count: number;
  spread: number;
  minDistance: number;
}

/**
 * 생성된 공의 y축 고정 위치.
 * - y축 방향으로 -5m 위치에 공이 생성돼요.
 */
const BALL_SPAWN_Y = -5;

/**
 * 생성된 공의 z축 고정 위치.
 * - z축 방향으로 2m 위치에 공이 생성돼요.
 */
const BALL_SPAWN_Z = 2;

/**
 * 주어진 개수(count)만큼 x축에 일정 거리(minDistance)를 유지하며
 * 공의 위치를 랜덤하게 생성하는 함수에요.
 *
 * @param count - 생성할 공의 개수
 * @param spread - x축으로 퍼질 수 있는 전체 거리
 * @param minDistance - 공 사이의 최소 간격 (x축 기준)
 * @returns [x, y, z] 형태의 공 위치 배열
 * @throws spread가 count * minDistance보다 작으면 에러
 */
export const generateRandomPositions = ({
  count,
  spread,
  minDistance,
}: GenerateRandomPositionParams): [number, number, number][] => {
  if (count * minDistance > spread) {
    throw new Error(`Invalid spawn config.`);
  }

  const positions: [number, number, number][] = [];

  while (positions.length < count) {
    const x = THREE.MathUtils.randFloatSpread(spread);
    const y = BALL_SPAWN_Y;
    const z = BALL_SPAWN_Z;

    if (isPositionValid(positions, x, minDistance)) {
      insertSorted(positions, [x, y, z]);
    }
  }

  return positions;
};

const isPositionValid = (
  positions: [number, number, number][],
  x: number,
  minDistance: number
): boolean => {
  if (positions.length === 0) {
    return true;
  }

  const firstX = positions[0][0];
  const lastX = positions[positions.length - 1][0];

  if (Math.abs(lastX - x) < minDistance) {
    return false;
  }

  if (Math.abs(firstX - x) < minDistance) {
    return false;
  }

  return true;
};

const insertSorted = (
  positions: [number, number, number][],
  newPosition: [number, number, number]
): void => {
  const index = positions.findIndex(
    ([existingX]) => existingX > newPosition[0]
  );
  if (index === -1) {
    positions.push(newPosition);
  } else {
    positions.splice(index, 0, newPosition);
  }
};
