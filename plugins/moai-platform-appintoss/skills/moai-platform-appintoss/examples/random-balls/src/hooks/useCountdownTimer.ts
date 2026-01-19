import { useEffect, useState, useRef, useCallback } from 'react';

interface UseCountdownTimerProps {
  duration: number;
  onCount?: (remainingTime: number) => void;
  onEnd?: () => void;
}

export function useCountdownTimer({
  duration,
  onCount,
  onEnd,
}: UseCountdownTimerProps) {
  const [remainingTime, setRemainingTime] = useState<number>(duration);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetCountdown = useCallback(() => {
    clear();
    setIsCountingDown(false);
    setRemainingTime(duration);
  }, [clear, duration]);

  const startCountdown = useCallback(() => {
    if (isCountingDown || intervalRef.current !== null) {
      return;
    }

    setIsCountingDown(true);

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        const nextTime = prev - 1;

        if (onCount) {
          onCount(nextTime);
        }

        if (nextTime > 0) {
          return nextTime;
        }

        clear();
        setIsCountingDown(false);

        if (onEnd) {
          onEnd();
        }

        return duration;
      });
    }, 1000);
  }, [clear, duration, onCount, onEnd, isCountingDown]);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return {
    startCountdown,
    resetCountdown,
    remainingTime,
    isCountingDown,
  };
}
