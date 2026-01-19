/**
 * 숫자를 지정된 범위로 제한합니다.
 * @param n - 제한할 숫자
 * @param lo - 최소값
 * @param hi - 최대값
 * @returns 제한된 숫자
 */
export function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

/**
 * 지정된 범위에서 랜덤한 정수를 선택합니다.
 * @param lo - 최소값 (포함)
 * @param hi - 최대값 (포함)
 * @returns 랜덤한 정수
 */
export function pickRandomInt(lo: number, hi: number): number {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

/**
 * 배열을 Fisher-Yates 셔플 알고리즘으로 섞습니다.
 * @param array - 섞을 배열
 * @returns 섞인 배열 (원본 배열을 변경)
 */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
