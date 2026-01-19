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

export const useVisibilityChange = ({
  onVisible,
  onHidden,
}: UseVisibilityChangeOptions) => {
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
};
