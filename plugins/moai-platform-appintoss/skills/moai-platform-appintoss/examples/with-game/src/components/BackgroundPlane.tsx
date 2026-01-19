import { Image } from '@react-three/drei';

interface BackgroundPlaneProps {
  url?: string;
  filterColor?: string;
  filterOpacity?: number;
}

export function BackgroundPlane({
  url = '/bg.jpg',
  filterColor = '#000000',
  filterOpacity = 0.3,
}: BackgroundPlaneProps) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]} position={[0, 255, 50]} scale={185}>
      <Image url={url} />
      <mesh position={[0, 0.01, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={filterColor}
          transparent
          opacity={filterOpacity}
        />
      </mesh>
    </group>
  );
}
