import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { BallData } from '../../hooks/useBallState';
import { useRef } from 'react';

interface BallObserverProps {
  balls: BallData[];
  removeBall: (id: number) => void;
  addFinishedBall: (number: number) => void;
  goalZ: number;
}

export function BallObserver({
  balls,
  removeBall,
  addFinishedBall,
  goalZ,
}: BallObserverProps) {
  const { scene } = useThree();
  const tempVec = useRef(new THREE.Vector3());

  useFrame(() => {
    if (goalZ <= 0 || balls.length === 0) {
      return;
    }

    balls.forEach((ball) => {
      ball?.mesh?.current?.getWorldPosition(tempVec.current);

      if (tempVec.current.z > goalZ && ball.mesh.current) {
        addFinishedBall(ball.number);
        removeBall(ball.id);
        scene.remove(ball.mesh.current);
      }
    });
  });

  return null;
}
