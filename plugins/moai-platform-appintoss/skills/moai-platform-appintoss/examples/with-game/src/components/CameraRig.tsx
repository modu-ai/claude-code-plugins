import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

export function CameraRig() {
  return (
    <group>
      <PerspectiveCamera
        makeDefault
        position={[0, -20.5, 3]}
        zoom={1.5}
        near={0.1}
        far={1000}
      />
      <OrbitControls enabled={false} />
    </group>
  );
}
