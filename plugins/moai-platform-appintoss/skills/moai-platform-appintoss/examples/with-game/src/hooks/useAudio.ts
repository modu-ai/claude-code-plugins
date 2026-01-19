import { useCallback, useEffect, useRef, useMemo } from 'react';
import { Howl } from 'howler';
import {
  clampVolume,
  resumeHowlerContext,
  createHowlConfig,
  isAudioPlaying,
  setAudioVolume,
} from '@/utils/audioUtils';
import { useVisibilityChange } from '@/hooks/useVisibilityChange';

interface AudioProps {
  src: string;
  loop?: boolean;
  volume?: number;
}

interface AudioControls {
  playAudio: () => Promise<void>;
  stopAudio: () => void;
  pause: () => void;
  fade: (from: number, to: number, duration: number) => void;
  audioRef: React.RefObject<Howl | null>;
}

export function useAudio({
  src,
  loop = false,
  volume = 1,
}: AudioProps): AudioControls {
  const howlRef = useRef<Howl | null>(null);
  const wasPlayingRef = useRef<boolean>(false);
  const isInitializedRef = useRef<boolean>(false);

  // Howl 설정을 메모이제이션하여 불필요한 재생성 방지
  const howlConfig = useMemo(
    () => createHowlConfig(src, loop, volume),
    [src, loop, volume]
  );

  // Howl 인스턴스 초기화
  useEffect(() => {
    if (isInitializedRef.current) {
      return;
    }

    const howl = new Howl(howlConfig);
    howlRef.current = howl;
    isInitializedRef.current = true;

    return () => {
      if (howlRef.current) {
        howlRef.current.stop();
        howlRef.current.unload();
        howlRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, [howlConfig, volume]);

  // 볼륨 변경 시 업데이트
  useEffect(() => {
    setAudioVolume(howlRef.current, volume);
  }, [volume]);

  const playAudio = useCallback(async (): Promise<void> => {
    const howl = howlRef.current;
    if (howl === null) {
      console.warn('오디오 인스턴스가 초기화되지 않았어요.');
      return;
    }

    try {
      setAudioVolume(howl, volume);

      howl.play();
      wasPlayingRef.current = true;
    } catch (error) {
      console.warn('Howl 오디오 재생 실패:', error);
    }
  }, [volume]);

  const stopAudio = useCallback((): void => {
    const howl = howlRef.current;
    if (howl === null) {
      return;
    }

    howl.stop();
    wasPlayingRef.current = false;
  }, []);

  const pause = useCallback((): void => {
    const howl = howlRef.current;
    if (howl === null) {
      return;
    }

    howl.pause();
    wasPlayingRef.current = false;
  }, []);

  const fade = useCallback(
    (from: number, to: number, duration: number): void => {
      const howl = howlRef.current;
      if (howl === null) {
        return;
      }

      howl.fade(clampVolume(from), clampVolume(to), duration);
    },
    []
  );

  // iOS 오디오 세션 관리를 위한 가시성 변경 처리
  const handleVisible = useCallback(() => {
    const howl = howlRef.current;
    if (howl === null) {
      return;
    }

    // iOS: 이전에 재생 중이었다면 오디오 세션 재개 및 재생
    if (wasPlayingRef.current === false) {
      return;
    }

    // 오디오 컨텍스트가 준비될 때까지 짧은 지연
    setTimeout(() => {
      try {
        resumeHowlerContext();
        howl.play();
      } catch (error) {
        console.warn('오디오 재개 실패:', error);
        // 재개 실패 시 unlock 이벤트를 통해 재생 재시도
        howl.once('unlock', () => {
          howl.play();
        });
      }
    }, 100);
  }, []);

  const handleHidden = useCallback(() => {
    const howl = howlRef.current;
    if (howl === null) {
      return;
    }

    // 백그라운드로 가기 전 재생 상태 기억
    wasPlayingRef.current = isAudioPlaying(howl);
    howl.pause();
  }, []);

  useVisibilityChange({
    onVisible: handleVisible,
    onHidden: handleHidden,
  });

  return {
    audioRef: howlRef,
    playAudio,
    stopAudio,
    pause,
    fade,
  };
}
