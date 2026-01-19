/**
 * 주어진 숫자(index)에 순위 접미사(st, nd, rd, th)를 붙여 반환해요.
 *
 * @param index - 순위 숫자 (예: 1, 2, 3, ...)
 * @returns 순위 문자열 (예: "1st", "2nd", "3rd", "4th", ...)
 */
export const getRanks = (index: number) => {
  const suffixes: { [key: number]: string } = {
    1: 'st',
    2: 'nd',
    3: 'rd',
  };
  const suffix = suffixes[index] || 'th';
  return `${index}${suffix}`;
};
