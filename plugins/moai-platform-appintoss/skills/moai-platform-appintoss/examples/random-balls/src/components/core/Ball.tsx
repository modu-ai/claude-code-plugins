import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useTexture } from '@react-three/drei';

interface BallProps {
  number: number;
  position: [number, number, number];
  mesh: React.RefObject<THREE.Mesh>;
  gravityScale: number;
}

const BALL_GEOMETRY_ARGS: [number, number, number] = [0.6, 16, 16];

export function Ball({ number, position, mesh, gravityScale }: BallProps) {
  const texture = useTexture(`/ball-texture-${number}.png`);

  return (
    <RigidBody position={position} colliders="ball" gravityScale={gravityScale}>
      <mesh ref={mesh} castShadow receiveShadow name={number.toString()}>
        <sphereGeometry args={BALL_GEOMETRY_ARGS} />
        <meshPhongMaterial map={texture} shininess={0} />
      </mesh>
    </RigidBody>
  );
}
