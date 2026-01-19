import { useState, useEffect, useRef } from 'react';
import { GAME_CONFIG } from '@/utils/gameConfig';

/**
 * useGauge Hook
 * @param isCharging 게이지 활성화 여부
 * @param maxForce 게이지의 최대값
 * @param speed - (선택 사항) 게이지 값이 초당 움직이는 속도 (기본값: maxForce)
 */
export const useGauge = (
  isCharging: boolean,
  maxForce: number,
  speed: number = GAME_CONFIG.FORCE.GAUGE_SPEED
) => {
  const [value, setValue] = useState<number>(GAME_CONFIG.FORCE.MIN);
  const frameIdRef = useRef<number>(0);
  const direction = useRef<number>(1);
  const lastTime = useRef<number>(0);

  useEffect(() => {
    if (isCharging === false) {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      setValue(GAME_CONFIG.FORCE.MIN);
      direction.current = 1;
      lastTime.current = 0;
      return;
    }

    const animate = (timestamp: number) => {
      if (lastTime.current === 0) {
        lastTime.current = timestamp;
      }
      const deltaTime = (timestamp - lastTime.current) / 1000;
      lastTime.current = timestamp;

      setValue((prevValue) => {
        let newValue = prevValue + direction.current * speed * deltaTime;

        if (newValue >= maxForce) {
          newValue = maxForce;
          direction.current = -1;
        } else if (newValue <= GAME_CONFIG.FORCE.MIN) {
          newValue = GAME_CONFIG.FORCE.MIN;
          direction.current = 1;
        }

        return newValue;
      });

      frameIdRef.current = requestAnimationFrame(animate);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [isCharging, maxForce, speed]);

  const normalizedValue =
    maxForce > GAME_CONFIG.FORCE.MIN
      ? (value - GAME_CONFIG.FORCE.MIN) / (maxForce - GAME_CONFIG.FORCE.MIN)
      : 0;

  const fillPercentage = Math.max(0, Math.min(1, normalizedValue));

  return {
    value,
    fillPercentage,
  };
};
