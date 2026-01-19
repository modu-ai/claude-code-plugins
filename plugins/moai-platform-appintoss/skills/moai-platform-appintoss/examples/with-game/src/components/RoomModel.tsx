import { Mesh } from 'three';
import { Object3D, Material } from 'three';

interface RoomModelProps {
  assets: {
    nodes: { [name: string]: Object3D };
    materials: { [name: string]: Material };
  };
}

export function RoomModel({ assets }: RoomModelProps) {
  const { nodes, materials } = assets;

  return (
    <>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes['wall-front'] as Mesh).geometry}
          material={materials.wall}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes['wall-left'] as Mesh).geometry}
          material={materials.wall}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes['wall-right'] as Mesh).geometry}
          material={materials.wall}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.floor as Mesh).geometry}
          material={materials.floor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.window as Mesh).geometry}
          material={materials.window}
        />
        <mesh
          geometry={(nodes.glass as Mesh).geometry}
          material={materials.glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.lamp as Mesh).geometry}
          material={materials.lamp}
        />
      </group>
    </>
  );
}
