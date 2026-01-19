import { forwardRef, useRef, useEffect } from 'react';
import { Mesh, Box3, Vector3, Object3D, Material } from 'three';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useTableStateStore } from '@/store/tableStateStore';
import { useShallow } from 'zustand/react/shallow';

interface GameAssets {
  nodes: Record<string, Object3D>;
  materials: Record<string, Material>;
  scene: Object3D;
}

interface TableProps {
  assets: GameAssets;
}

export const Table = forwardRef<RapierRigidBody, TableProps>(
  ({ assets }, ref) => {
    const { nodes, materials } = assets;
    const tableMeshRef = useRef<Mesh>(null);
    const { setTableHeight, setTableBounds } = useTableStateStore(
      useShallow((state) => ({
        setTableHeight: state.setTableHeight,
        setTableBounds: state.setTableBounds,
      }))
    );

    useEffect(() => {
      if (tableMeshRef.current) {
        const box = new Box3().setFromObject(tableMeshRef.current);
        const size = new Vector3();
        const center = new Vector3();

        box.getSize(size);
        box.getCenter(center);

        const startY = center.y - size.y / 2;
        const endY = center.y + size.y / 2;

        setTableHeight(size.y);
        setTableBounds(startY, endY);
      }
    }, [setTableHeight, setTableBounds]);

    return (
      <RigidBody ref={ref} type="fixed" rotation={[Math.PI / 2, 0, 0]}>
        <group>
          <mesh
            ref={tableMeshRef}
            castShadow
            receiveShadow
            geometry={(nodes.table as Mesh).geometry}
            material={materials.table}
          />
        </group>
      </RigidBody>
    );
  }
);
