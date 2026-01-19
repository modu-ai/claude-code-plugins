import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { BallData } from '../../hooks/useBallState';

interface UseFollowCameraProps {
  balls: BallData[];
}

/**
 * 공을 따라가는 카메라의 상대 위치 오프셋이에요.
 * - 공보다 위(y축 +3), 뒤(z축 +7)에서 따라오도록 설정돼 있어요.
 */
const CAMERA_OFFSET = new THREE.Vector3(0, 3, 7);

export function FollowCamera({ balls }: UseFollowCameraProps) {
  const { camera, scene } = useThree();
  const tempVec = new THREE.Vector3();
  const targetVec = new THREE.Vector3();

  const updateCameraToFollow = (target: THREE.Vector3) => {
    targetVec.copy(target).add(CAMERA_OFFSET);
    camera.position.lerp(targetVec, 0.1);
    camera.lookAt(target);
  };

  useFrame(() => {
    if (balls.length === 0) {
      return;
    }

    let maxZBall = null;
    let maxZ = -Infinity;

    for (const ball of balls) {
      if (!ball?.mesh?.current) {
        continue;
      }

      ball.mesh.current.getWorldPosition(tempVec);

      if (tempVec.z > maxZ) {
        maxZ = tempVec.z;
        maxZBall = tempVec.clone();
      }
    }

    const targetPosition = maxZBall;

    if (targetPosition) {
      updateCameraToFollow(targetPosition);
    }

    scene.userData.activeCamera = camera;
  });

  return null;
}
