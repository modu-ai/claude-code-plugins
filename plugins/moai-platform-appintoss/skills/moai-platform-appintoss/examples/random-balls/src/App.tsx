import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Lights } from './components/environment/Lights';
import { MultiCameraRenderer } from './components/camera/MultiCameraRenderer';
import { GameUI } from './components/ui/GameUI';
import { BallObserver } from './components/core/BallObserver';
import { GameMap } from './components/map/GameMap';
import { FollowCamera } from './components/camera/FollowCamera';
import { useGameStatus } from './hooks/useGameStatus';
import { useAudio } from './hooks/useAudio';
import { ScreenAwake } from './components/system/ScreenAwake';
import { useBallState } from './hooks/useBallState';
import { DeviceViewport } from './components/system/DeviceViewport';
import { Ball } from './components/core/Ball';
import { GameEndTimer } from './components/system/GameEndTimer';

/**
 * 물리 엔진에 적용되는 중력 벡터.
 * - y축 방향으로 -9.8m/s² 중력이 작용해요.
 */
const GRAVITY: [number, number, number] = [0, -9.8, 0];

/**
 * 물리 시뮬레이션의 시간 간격 (초 단위).
 * - 1/120초마다 물리 계산이 이루어져요.
 */
const PHYSICS_TIME_STEP = 1 / 120;

/**
 * 게임의 배경 음악 경로.
 * - 퍼블릭 디렉토리에 있는 mp3 파일이에요.
 */
const GAME_BGM_PATH = '/bad-guys.mp3';

/**
 * 각 공에 적용되는 중력 계수.
 * - 1보다 작을 경우 중력 효과가 감소돼요.
 */
const BALL_GRAVITY_SCALE = 0.8;

export default function App() {
  const [goalZ, setGoalZ] = useState<number>(0);
  const [finishedBalls, setFinishedBalls] = useState<number[]>([]);
  const [countdown, setCountdown] = useState<number>(-1);
  const { balls, incrementCount, decrementCount, resetBalls, removeBall } =
    useBallState();

  const { play: bgmPlay, stop: bgmStop } = useAudio(GAME_BGM_PATH);
  const resetFinishedBalls = () => setFinishedBalls([]);
  const { gameStatus, resetGame, startGame, endGame, isPlaying } =
    useGameStatus({
      resetBalls,
      resetFinishedBalls,
    });

  const addFinishedBall = (ball: number) => {
    setFinishedBalls((prev) => (prev.includes(ball) ? prev : [...prev, ball]));
  };

  return (
    <>
      <GameUI
        gameStatus={gameStatus}
        onReadyGame={() => {
          resetGame();
          bgmStop();
        }}
        onPlayGame={() => {
          startGame();
          bgmPlay();
        }}
        ballNumber={balls.length}
        ballRank={finishedBalls}
        countdown={countdown}
        incrementCount={incrementCount}
        decrementCount={decrementCount}
      />
      <GameEndTimer
        ballsLength={balls.length}
        finishedBalls={finishedBalls}
        gameStatus={gameStatus}
        onCount={setCountdown}
        onEnd={endGame}
      />
      <Canvas shadows className="game-screen">
        <Lights />
        <Physics
          key={isPlaying ? 'play' : 'end'}
          gravity={GRAVITY}
          updateLoop="follow"
          timeStep={PHYSICS_TIME_STEP}
          paused={!isPlaying}
        >
          <BallObserver
            balls={balls}
            removeBall={removeBall}
            addFinishedBall={addFinishedBall}
            goalZ={goalZ}
          />
          {balls.map(({ id, ...props }) => (
            <Ball key={id} {...props} gravityScale={BALL_GRAVITY_SCALE} />
          ))}
          <GameMap onGoalZCalculated={setGoalZ} />
        </Physics>
        <FollowCamera balls={balls} />
        <MultiCameraRenderer />
      </Canvas>
      <ScreenAwake />
      <DeviceViewport />
    </>
  );
}
