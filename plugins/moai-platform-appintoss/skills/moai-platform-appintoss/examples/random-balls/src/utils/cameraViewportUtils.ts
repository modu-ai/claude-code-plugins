import * as THREE from 'three';

/**
 * 화면 크기에 따라 전체 뷰포트와 1인칭 뷰포트를 계산해요.
 *
 * @param size - 화면의 크기 (width, height)
 * @returns overall(상단 2/3), firstPerson(하단 1/3) 뷰포트 정보를 반환해요.
 */
export const getViewports = (size: { width: number; height: number }) => ({
  overall: {
    x: 0,
    y: size.height / 3,
    width: size.width,
    height: (size.height * 2) / 3,
  },
  firstPerson: {
    x: 0,
    y: 0,
    width: size.width,
    height: size.height / 3,
  },
});

/**
 * 주어진 뷰포트 영역에 카메라 시점을 기반으로 씬을 렌더링해요.
 *
 * @param gl - WebGL 렌더러
 * @param scene - 렌더링할 Three.js 씬
 * @param camera - 사용할 카메라
 * @param viewport - 렌더링할 뷰포트 위치 및 크기
 * @param clearColor - 선택적 배경색
 */
export const renderViewport = (
  gl: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  viewport: { x: number; y: number; width: number; height: number },
  clearColor?: number
) => {
  camera.aspect = viewport.width / viewport.height;
  camera.updateProjectionMatrix();

  gl.setScissor(viewport.x, viewport.y, viewport.width, viewport.height);
  gl.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);

  if (clearColor !== undefined) {
    gl.setClearColor(clearColor);
    gl.clearColor();
  }

  gl.render(scene, camera);
};
