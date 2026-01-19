import { useEffect, useCallback } from 'react';

/**
 * 가시성 변경 이벤트를 처리하는 커스텀 훅
 * @param onVisible 앱이 포그라운드로 돌아올 때 실행할 콜백
 * @param onHidden 앱이 백그라운드로 갈 때 실행할 콜백
 */
interface UseVisibilityChangeOptions {
  onVisible?: () => void;
  onHidden?: () => void;
}

export interface VisibilityChangeAPI {
  onVisible?: () => void;
  onHidden?: () => void;
  waitForVisibility: (
    targetState?: DocumentVisibilityState,
    delayMs?: number
  ) => Promise<void>;
}

export const useVisibilityChange = (
  options?: UseVisibilityChangeOptions
): VisibilityChangeAPI => {
  const { onVisible, onHidden } = options ?? {};
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      onVisible?.();
    } else {
      onHidden?.();
    }
  }, [onVisible, onHidden]);

  useEffect(() => {
    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return { onVisible, onHidden, waitForVisibility };
};

/**
 * 특정 가시성 상태가 될 때까지 대기하는 유틸 함수
 * 기존 훅 동작에 영향을 주지 않는 순수 함수입니다.
 */
function resolveWithDelay(resolve: () => void, delayMs: number): void {
  if (delayMs > 0) {
    setTimeout(resolve, delayMs);
  } else {
    resolve();
  }
}

function waitForVisibility(
  targetState: DocumentVisibilityState = 'visible',
  delayMs: number = 0
): Promise<void> {
  if (document.visibilityState === targetState) {
    return new Promise((resolve) => resolveWithDelay(resolve, delayMs));
  }

  return new Promise((resolve) => {
    const handler = () => {
      if (document.visibilityState === targetState) {
        window.removeEventListener('visibilitychange', handler);
        resolveWithDelay(resolve, delayMs);
      }
    };

    window.addEventListener('visibilitychange', handler, { once: false });
  });
}
