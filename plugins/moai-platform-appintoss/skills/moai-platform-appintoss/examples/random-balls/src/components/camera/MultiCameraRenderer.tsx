import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getViewports, renderViewport } from '../../utils/cameraViewportUtils';

/**
 * 전체 시점 카메라의 설정 정보예요.
 * - 위에서 전체 맵을 내려다보는 시점을 구성해요.
 */
const CAMERA_CONFIG = {
  fov: 50,
  near: 1,
  far: 1000,
  position: new THREE.Vector3(0, -55, 120),
  lookAt: new THREE.Vector3(0, -65, -90),
};

export function MultiCameraRenderer() {
  const { gl, scene, size, camera } = useThree();

  const overallCameraRef = useRef(
    new THREE.PerspectiveCamera(
      CAMERA_CONFIG.fov,
      size.width / size.height,
      CAMERA_CONFIG.near,
      CAMERA_CONFIG.far
    )
  );

  useEffect(() => {
    const cam = overallCameraRef.current;
    cam.position.copy(CAMERA_CONFIG.position);
    cam.lookAt(CAMERA_CONFIG.lookAt);
  }, []);

  useFrame(() => {
    if (gl.autoClear) {
      gl.clear();
    }

    gl.autoClear = false;
    gl.setScissorTest(true);

    const viewports = getViewports(size);

    // 위쪽: 전체 시점 카메라
    renderViewport(gl, scene, overallCameraRef.current, viewports.overall);

    // 아래쪽: 퍼스트 퍼슨 카메라
    const mainCamera = camera as THREE.PerspectiveCamera;
    renderViewport(gl, scene, mainCamera, viewports.firstPerson, 0x000000);

    gl.setScissorTest(false);
    gl.autoClear = true;
  }, 1);

  return null;
}
