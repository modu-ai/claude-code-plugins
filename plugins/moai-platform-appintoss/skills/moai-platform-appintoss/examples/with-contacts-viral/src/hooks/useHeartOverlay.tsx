import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function useHeartOverlay() {
  const [visible, setVisible] = useState(false);
  const [rev, setRev] = useState(0);
  const overlayElementRef = useRef<HTMLElement | null>(
    document.getElementById('overlay')
  );
  const hideTimerRef = useRef<number | null>(null);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const play = useCallback(() => {
    // 대기 중인 자동 숨김 제거
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    // 이미 보이고 있으면 잠시 언마운트 후 다시 마운트하여 재생
    if (visible) {
      setVisible(false);
      requestAnimationFrame(() => {
        setRev((v) => v + 1);
        setVisible(true);
      });
      return;
    }

    setRev((v) => v + 1);
    setVisible(true);
  }, [visible]);

  // 선택적: APNG가 필요한 경우 자동 숨김
  useEffect(() => {
    if (!visible) return;
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }
    // APNG는 종료 이벤트가 없어 필요 시 타이머로 제어
    // 필요 없으면 이 타이머를 제거하거나 시간값을 조절하세요
    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
    }, 900);

    return () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, [visible]);

  const Portal = useCallback(() => {
    const overlayElement = overlayElementRef.current;
    const src = `/heart-animation.png?v=${rev}`;

    if (visible === false || overlayElement === null) {
      return null;
    }

    return createPortal(
      <div className="heart-container">
        <img src={src} className="heart" alt="" />
      </div>,
      overlayElement
    );
  }, [visible, rev]);

  return { play, hide, Portal } as const;
}
