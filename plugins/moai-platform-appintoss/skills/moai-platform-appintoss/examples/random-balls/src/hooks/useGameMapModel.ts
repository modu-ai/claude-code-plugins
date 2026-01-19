import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    [name: string]: THREE.Object3D<THREE.Object3DEventMap>;
  };
};

export const useGameMapModel = (path: string) => {
  const { nodes } = useGLTF(path) as GLTFResult;

  // 동적으로 모든 노드를 그룹화하고 크기 계산
  const getModelSizeFromAllNodes = (nodes: {
    [name: string]: THREE.Object3D;
  }) => {
    const group = new THREE.Group();
    Object.values(nodes).forEach((node) => {
      if (node instanceof THREE.Object3D === false) {
        return;
      }

      group.add(node.clone());
    });

    const box = new THREE.Box3().setFromObject(group);
    return box.getSize(new THREE.Vector3());
  };

  const size = useMemo(() => getModelSizeFromAllNodes(nodes), [nodes]);

  return {
    nodes,
    size,
  };
};
