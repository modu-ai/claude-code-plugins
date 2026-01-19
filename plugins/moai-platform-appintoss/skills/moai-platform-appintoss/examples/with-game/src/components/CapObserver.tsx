import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import { useShallow } from 'zustand/react/shallow';
import { useTableStateStore } from '@/store/tableStateStore';
import { useGameStateStore } from '@/store/gameStateStore';
import { isValidRigidBody } from '@/utils/rigidBodyUtils';
import {
  detectShot,
  detectStop,
  detectFall,
  updateDistance,
} from '@/utils/gameLogicUtils';

interface CapObserverProps {
  capRef: React.RefObject<RapierRigidBody | null>;
}

export function CapObserver({ capRef }: CapObserverProps) {
  const lastShotTimeRef = useRef<number>(0);
  const stoppedTimeRef = useRef<boolean>(false);
  const endTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastDistanceRef = useRef<number>(0);

  const { tableEndY } = useTableStateStore(
    useShallow((state) => ({
      tableEndY: state.tableEndY,
    }))
  );

  const {
    hasShot,
    isGameEnd,
    distanceToEnd,
    setHasShot,
    setDistanceToEnd,
    setIsGameEnd,
  } = useGameStateStore(
    useShallow((state) => ({
      hasShot: state.hasShot,
      isGameEnd: state.isGameEnd,
      distanceToEnd: state.distanceToEnd,
      setHasShot: state.setHasShot,
      setDistanceToEnd: state.setDistanceToEnd,
      setIsGameEnd: state.setIsGameEnd,
    }))
  );

  useEffect(() => {
    if (hasShot === false) {
      lastShotTimeRef.current = 0;
      stoppedTimeRef.current = false;
      lastDistanceRef.current = 0;

      if (endTimerRef.current) {
        clearTimeout(endTimerRef.current);
        endTimerRef.current = null;
      }
    }
  }, [hasShot, isGameEnd]);

  useFrame(() => {
    if (capRef.current === null || isValidRigidBody(capRef.current) === false) {
      return;
    }

    const translation = capRef.current.translation();
    const linvel = capRef.current.linvel();

    if (isGameEnd) {
      return;
    }

    const capY = translation.y;
    const capZ = translation.z;

    updateDistance(
      capY,
      isGameEnd,
      distanceToEnd,
      tableEndY,
      lastDistanceRef,
      setDistanceToEnd
    );
    detectShot(linvel, hasShot, setHasShot, lastShotTimeRef);
    detectStop(
      linvel,
      capY,
      hasShot,
      lastShotTimeRef,
      stoppedTimeRef,
      endTimerRef,
      tableEndY,
      setDistanceToEnd,
      setIsGameEnd
    );
    detectFall(
      capZ,
      hasShot,
      isGameEnd,
      endTimerRef,
      setDistanceToEnd,
      setIsGameEnd
    );
  });

  return null;
}
