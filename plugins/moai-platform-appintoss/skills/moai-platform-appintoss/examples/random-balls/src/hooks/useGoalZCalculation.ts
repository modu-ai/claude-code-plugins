import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const useGoalZCalculation = (
  meshRef: React.RefObject<THREE.Group>,
  depth: number,
  onGoalZCalculated: (goalZ: number) => void
) => {
  const worldPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    if (meshRef.current === null) {
      return;
    }

    meshRef.current.getWorldPosition(worldPosition.current);
    const goalZ = worldPosition.current.z + depth / 2;
    onGoalZCalculated(goalZ);
  }, [depth, onGoalZCalculated]);
};
