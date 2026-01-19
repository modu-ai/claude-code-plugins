import { forwardRef } from 'react';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useGameAssets } from '@/hooks/useGameAssets';
import { GAME_CONFIG } from '@/utils/gameConfig';
import { useTableStateStore } from '@/store/tableStateStore';

export const Cap = forwardRef<RapierRigidBody>((_, ref) => {
  const { scene } = useGameAssets({ path: '/bottle-cap.glb' });
  const { tableStartY } = useTableStateStore();

  return (
    <RigidBody
      ref={ref}
      position={[
        GAME_CONFIG.CAP.START_X,
        tableStartY + 0.5,
        GAME_CONFIG.CAP.START_Z,
      ]}
      rotation={[Math.PI / 2, 0, 0]}
      colliders="cuboid"
      scale={0.3}
      linearDamping={1}
      restitution={0.6}
    >
      <primitive object={scene} />
    </RigidBody>
  );
});
