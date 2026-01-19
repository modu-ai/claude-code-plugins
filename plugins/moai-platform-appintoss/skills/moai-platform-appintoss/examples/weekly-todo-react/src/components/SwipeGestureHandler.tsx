import { useState } from 'react';
import { generateHapticFeedback } from '@apps-in-toss/web-framework';

interface Props {
  children: React.ReactNode;
  isSorting: boolean;
}

/**
 * 초기 스와이프 오프셋 값이에요. 스와이프 시작 전에는 항상 0이에요.
 */
const INITIAL_SWIPE_OFFSET = 0;

/**
 * 이 거리만큼 스와이프하면 스와이프 동작이 트리거돼요.
 */
const SWIPE_TRIGGER_DISTANCE = 70;

/**
 * 스와이프가 최대한으로 이동할 수 있는 거리예요.
 */
const FULL_SWIPE_DISTANCE = 80;

export function SwipeGestureHandler({ children, isSorting }: Props) {
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragMoveX, setDragMoveX] = useState<number>(INITIAL_SWIPE_OFFSET);
  const [isFullySwiped, setIsFullySwiped] = useState<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSorting) {
      return;
    }

    setDragStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null || isSorting) {
      return;
    }

    const moveDistance = dragStartX - e.targetTouches[0].clientX;
    const limitedMoveDistance = Math.min(moveDistance, FULL_SWIPE_DISTANCE);
    setDragMoveX(limitedMoveDistance);
  };

  const handleTouchEnd = () => {
    const inInitialPosition = dragMoveX === INITIAL_SWIPE_OFFSET;

    if (inInitialPosition) {
      return;
    }

    if (dragMoveX >= SWIPE_TRIGGER_DISTANCE) {
      setDragMoveX(FULL_SWIPE_DISTANCE);
      setIsFullySwiped(true);
      generateHapticFeedback({ type: 'softMedium' });
    } else {
      setDragMoveX(0);
      setIsFullySwiped(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    transform: `translateX(-${dragMoveX}px)`,
    transition: isFullySwiped
      ? 'transform 0.2s ease-in-out'
      : 'transform 0.3s ease-out',
    position: 'relative',
    width: '100%',
    paddingInline: '8px',
    zIndex: 50,
    backgroundColor: 'var(--color-gray-200)',
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={containerStyle}
    >
      {children}
    </div>
  );
}
