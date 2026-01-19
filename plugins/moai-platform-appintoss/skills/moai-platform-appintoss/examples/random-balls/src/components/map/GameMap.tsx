import { useRef } from 'react';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';
import { useGameMapModel } from '../../hooks/useGameMapModel';
import { useGoalZCalculation } from '../../hooks/useGoalZCalculation';
import { calculatePosition } from '../../utils/calculatePosition';
import { Blocker } from '../core/Blocker';

type GLTFResult = ReturnType<typeof useGameMapModel>['nodes'];

interface GameMapProps {
  onGoalZCalculated: (goalZ: number) => void;
}

interface BlockerConfig {
  objectKey: string;
  speed: number;
  position: [number, number, number];
  reverse?: boolean;
}

/**
 * 게임 맵 GLB 모델 파일 경로예요.
 */
const GLB_PATH = '/random-balls-map-optimized.glb';

/**
 * 게임 맵의 회전 각도예요. (도 단위)
 */
const MAP_ROTATION_ANGLE_DEG = 30;

/**
 * 게임 맵의 회전 각도를 라디안으로 변환한 값이에요.
 */
const MAP_ROTATION_ANGLE_RAD = THREE.MathUtils.degToRad(MAP_ROTATION_ANGLE_DEG);

/**
 * 장애물(Blocker) 객체들의 설정 정보 배열이에요.
 * - objectKey는 GLTF 내 객체 키예요.
 * - position은 장애물의 초기 위치예요.
 * - speed는 이동 속도예요.
 * - reverse가 true이면 반대 방향으로 이동해요.
 */
const BLOCKER_CONFIGS: BlockerConfig[] = [
  {
    objectKey: 'toy_car01',
    speed: 3,
    position: [4.6, 0.5, -22],
  },
  {
    objectKey: 'toy_car02',
    speed: 2,
    position: [-10, 0.5, 31],
    reverse: true,
  },
];

export function GameMap({ onGoalZCalculated }: GameMapProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { nodes, size } = useGameMapModel(GLB_PATH);
  const [, height, depth] = size;

  useGoalZCalculation(meshRef, depth, onGoalZCalculated);

  const { y, z } = calculatePosition({
    angle: MAP_ROTATION_ANGLE_RAD,
    depth,
    height,
  });

  return (
    <group
      ref={meshRef}
      rotation={[MAP_ROTATION_ANGLE_RAD, 0, 0]}
      position={[0, y, depth / 2 - z]}
    >
      <Walls nodes={nodes} />
      <GroundObjects nodes={nodes} />
      {BLOCKER_CONFIGS.map(({ objectKey, ...rest }, i) => (
        <Blocker key={i} object={nodes[objectKey]} {...rest} />
      ))}
    </group>
  );
}

function Walls({ nodes }: { nodes: GLTFResult }) {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={nodes.wall_left} />
      <primitive object={nodes.wall_right} />
      <primitive object={nodes.banana01} />
      <primitive object={nodes.banana02} />
    </RigidBody>
  );
}

function GroundObjects({ nodes }: { nodes: GLTFResult }) {
  return (
    <RigidBody type="fixed" colliders="hull">
      <primitive object={nodes.floor} />
      <primitive object={nodes.rock01} />
      <primitive object={nodes.rock02} />
      <primitive object={nodes.cone01} />
      <primitive object={nodes.cone02} />
      <primitive object={nodes.cone03} />
      <primitive object={nodes.cone04} />
      <primitive object={nodes.fireplug} />
      <primitive object={nodes.dustbin} />
      <primitive object={nodes.box_position}>
        <primitive object={nodes.box01} />
        <primitive object={nodes.box02} />
      </primitive>
    </RigidBody>
  );
}

useGLTF.preload(GLB_PATH);
