import { Howl, Howler } from 'howler';

/**
 * 주어진 볼륨을 0~1 범위로 클램핑합니다.
 * @param volume - 설정하려는 볼륨 값
 * @returns 0 이상 1 이하로 제한된 볼륨 값
 */
export const clampVolume = (volume: number): number =>
  Math.max(0, Math.min(1, volume));

/**
 * Howler의 오디오 컨텍스트가 일시중지된 경우 재개합니다.
 * 모바일 브라우저(iOS 등) 포그라운드 전환 시 필요할 수 있습니다.
 */
export const resumeHowlerContext = (): void => {
  if (Howler.ctx && Howler.ctx.state === 'suspended') {
    Howler.ctx.resume();
  }
};

/**
 * Howl 인스턴스 생성을 위한 설정 객체를 반환합니다.
 * @param src - 오디오 소스 경로
 * @param loop - 반복 재생 여부
 * @param volume - 초기 볼륨 (0~1)
 * @param onLoadError - 로드 에러 콜백 (선택)
 * @param onPlayError - 재생 에러 콜백 (선택)
 * @returns Howl 생성자에 전달할 설정 객체
 */
export const createHowlConfig = (
  src: string,
  loop: boolean,
  volume: number,
  onLoadError?: (id: number, error: unknown) => void,
  onPlayError?: (id: number, error: unknown) => void
) => ({
  src: [src],
  loop,
  volume: clampVolume(volume),
  preload: true,
  html5: false, // 기본적으로 Web Audio API 사용
  onload: () => {
    console.log('Howl 오디오 로드 성공');
  },
  onloaderror:
    onLoadError ||
    ((_id: number, error: unknown) => {
      console.error('Howl 오디오 로드 에러:', error);
    }),
  onplayerror:
    onPlayError ||
    ((_id: number, error: unknown) => {
      console.error('Howl 오디오 재생 에러:', error);
    }),
});

/**
 * 주어진 Howl 인스턴스가 현재 재생 중인지 여부를 반환합니다.
 * @param howl - Howl 인스턴스 또는 null
 * @returns 재생 중이면 true, 아니면 false
 */
export const isAudioPlaying = (howl: Howl | null): boolean => {
  return howl ? howl.playing() : false;
};

/**
 * 안전하게 오디오 볼륨을 설정합니다.
 * @param howl - Howl 인스턴스 또는 null
 * @param volume - 설정할 볼륨 (0~1)
 */
export const setAudioVolume = (howl: Howl | null, volume: number): void => {
  if (howl) {
    const clampedVolume = clampVolume(volume);
    howl.volume(clampedVolume);
    console.log('Howl 볼륨 업데이트:', clampedVolume);
  }
};
