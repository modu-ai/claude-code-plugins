export interface CalculatePositionParams {
  angle: number;
  depth: number;
  height: number;
}

/**
 * 주어진 각도와 깊이, 높이를 기반으로 y, z 위치를 계산해요.
 *
 * @param angle - 회전 각도 (라디안 단위)
 * @param depth - z축 기준으로의 깊이 값
 * @param height - 객체의 높이
 * @returns y, z 좌표 객체
 */
export const calculatePosition = ({
  angle,
  depth,
  height,
}: CalculatePositionParams) => {
  const halfDepth = depth / 2;
  return {
    y: -(Math.sin(angle) * halfDepth + height / 2),
    z: halfDepth * (1 - Math.cos(angle)),
  };
};
