import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, quat } from '@react-three/rapier';
import * as THREE from 'three';

interface BlockerProps {
  object: THREE.Object3D;
  speed?: number;
  position: [number, number, number];
  reverse?: boolean;
}

export function Blocker({
  object,
  speed = 1,
  position,
  reverse = false,
}: BlockerProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const axisRef = useRef(new THREE.Vector3(0, reverse ? -1 : 1, 0));

  useFrame((_state, delta) => {
    if (rigidBodyRef.current === null) {
      return;
    }

    const currentRotation = quat(rigidBodyRef.current.rotation());
    const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
      axisRef.current,
      delta * speed
    );
    currentRotation.multiply(incrementRotation);
    rigidBodyRef.current.setNextKinematicRotation(currentRotation);
  });

  return (
    <RigidBody
      canSleep={false}
      type="kinematicPosition"
      colliders="hull"
      ref={rigidBodyRef}
      position={new THREE.Vector3(...position)}
    >
      <primitive position={[0, 0, 0]} object={object} />
    </RigidBody>
  );
}
