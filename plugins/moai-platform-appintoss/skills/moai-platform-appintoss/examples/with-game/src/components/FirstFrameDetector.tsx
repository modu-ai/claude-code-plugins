import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';

export function FirstFrameDetector({ onRendered }: { onRendered: () => void }) {
  const { active } = useProgress();
  const fired = useRef<boolean>(false);

  useFrame(() => {
    if (active === false && fired.current === false) {
      fired.current = true;
      onRendered();
    }
  });

  return null;
}
