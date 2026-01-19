import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SoftShadows, AdaptiveDpr, Preload } from '@react-three/drei';
import { Physics, RapierRigidBody } from '@react-three/rapier';
import { CapObserver } from '../components/CapObserver';
import { Table } from '../components/Table';
import { Cap } from '../components/Cap';
import { useGameAssets } from '../hooks/useGameAssets';
import { RoomModel } from '@/components/RoomModel';
import { SceneLights } from '@/components/SceneLights';
import { BackgroundPlane } from '@/components/BackgroundPlane';
import { CameraRig } from '@/components/CameraRig';
import { useGameStateStore } from '@/store/gameStateStore';
import { useShallow } from 'zustand/react/shallow';
import { GameController } from '@/components/GameController';
import { BGM } from '@/components/BGM';
import { FirstFrameDetector } from '@/components/FirstFrameDetector';

export function GamePage() {
  const roomAssets = useGameAssets({ path: '/room.glb' });
  const capRef = useRef<RapierRigidBody>(null);
  const tableRef = useRef<RapierRigidBody>(null);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);

  const { isGameEnd, physicsKey } = useGameStateStore(
    useShallow((state) => ({
      isGameEnd: state.isGameEnd,
      physicsKey: state.physicsKey,
    }))
  );

  return (
    <div className="page game-page">
      <Canvas className="game-screen" dpr={[1, 3]}>
        <Suspense fallback={null}>
          <AdaptiveDpr />
          <SceneLights />
          <SoftShadows samples={6} />
          <CameraRig />
          <BackgroundPlane />
          <RoomModel assets={roomAssets} />
          <Physics
            key={physicsKey ? 'game-end' : 'game-start'}
            paused={isGameEnd}
            gravity={[0, 0, -9.81]}
            debug={false}
            timeStep={1 / 120}
            updateLoop="follow"
          >
            <Table ref={tableRef} assets={roomAssets} />
            <Cap ref={capRef} />
          </Physics>
          <CapObserver capRef={capRef} />
          <FirstFrameDetector onRendered={() => setCanvasReady(true)} />
          <Preload all />
        </Suspense>
      </Canvas>
      {canvasReady && <GameController capRef={capRef} />}
      <BGM isGameEnd={isGameEnd} />
    </div>
  );
}
