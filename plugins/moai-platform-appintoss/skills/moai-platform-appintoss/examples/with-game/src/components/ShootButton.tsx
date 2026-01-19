import { useState } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { useGauge } from '@/hooks/useGauge';
import { useTableStateStore } from '@/store/tableStateStore';
import { useGameStateStore } from '@/store/gameStateStore';
import { useShallow } from 'zustand/react/shallow';
import {
  generateHapticFeedback,
  getPlatformOS,
} from '@apps-in-toss/web-framework';
import { useAudio } from '@/hooks/useAudio';

interface ShootButtonProps {
  capRef: React.RefObject<RapierRigidBody | null>;
}

export const ShootButton = ({ capRef }: ShootButtonProps) => {
  const { hasShot, setHasShot } = useGameStateStore(
    useShallow((state) => ({
      hasShot: state.hasShot,
      setHasShot: state.setHasShot,
    }))
  );
  const [isCharging, setIsCharging] = useState(false);
  const { tableHeight } = useTableStateStore();
  const { playAudio } = useAudio({
    src: '/hit-sound.wav',
    volume: 0.3,
  });

  const { value: gaugeValue, fillPercentage } = useGauge(
    isCharging,
    tableHeight
  );

  const isAndroid = getPlatformOS() === 'android';

  const handleShootStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    if (isCharging || hasShot) {
      return;
    }

    setIsCharging(true);
    setHasShot(false);
    generateHapticFeedback({ type: 'basicMedium' });
  };

  const handleShootEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (isCharging === false || hasShot) {
      return;
    }

    const currentForce = gaugeValue;
    setIsCharging(false);
    setHasShot(true);

    if (capRef.current) {
      const adjustedForce = currentForce * 0.13;
      capRef.current.applyImpulse({ x: 0, y: adjustedForce, z: 0 }, true);
      generateHapticFeedback({ type: 'basicMedium' });
      playAudio();
    }
  };

  return (
    <div className="game-controller" style={{ opacity: hasShot ? 0 : 1 }}>
      <div className="gauge-container">
        <div
          className="gauge-bar"
          style={{ width: `${fillPercentage * 100}%` }}
        />
      </div>
      <button
        className="button-base shoot-button"
        onMouseDown={handleShootStart}
        onMouseUp={handleShootEnd}
        onTouchStart={handleShootStart}
        onTouchEnd={handleShootEnd}
        disabled={hasShot}
        style={{
          right: isAndroid ? '80px' : '43px',
        }}
      >
        Hit!
      </button>
    </div>
  );
};
