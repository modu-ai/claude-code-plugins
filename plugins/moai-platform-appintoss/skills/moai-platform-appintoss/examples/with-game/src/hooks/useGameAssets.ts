import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

interface UseGameAssetsOptions {
  path: string;
}

export function useGameAssets({ path }: UseGameAssetsOptions) {
  const { nodes, materials, scene } = useGLTF(path);

  useEffect(() => {
    useGLTF.preload(path);
  }, [path]);

  return {
    nodes,
    materials,
    scene,
  };
}
