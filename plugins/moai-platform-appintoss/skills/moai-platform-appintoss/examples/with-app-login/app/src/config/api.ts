export const baseURL =
  import.meta.env.SERVER_BASE_URL ?? 'http://localhost:4000';

if (!import.meta.env.SERVER_BASE_URL) {
  console.warn(
    'SERVER_BASE_URL 환경 변수가 설정되지 않았어요. 기본 주소(http://localhost:4000)를 사용해요.'
  );
}
