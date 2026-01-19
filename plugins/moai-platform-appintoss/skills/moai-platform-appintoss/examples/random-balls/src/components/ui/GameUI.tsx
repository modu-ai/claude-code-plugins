import clsx from 'clsx';
import { GameStatus } from '../../hooks/useGameStatus';
import { ReadyScreen } from './ReadyScreen';
import { PlayingScreen } from './PlayingScreen';
import { RankingScreen } from './RankingScreen';

interface GameUIProps {
  gameStatus: GameStatus;
  onReadyGame: () => void;
  onPlayGame: () => void;
  ballNumber: number;
  ballRank: number[];
  countdown: number;
  incrementCount: () => void;
  decrementCount: () => void;
}

export function GameUI({
  gameStatus,
  countdown,
  ballNumber,
  ballRank,
  onPlayGame,
  onReadyGame,
  incrementCount,
  decrementCount,
}: GameUIProps) {
  return (
    <div className="game-ui">
      {(() => {
        switch (gameStatus) {
          case 'playing':
            return <PlayingScreen countdown={countdown} />;
          case 'ready':
            return (
              <ReadyScreen
                ballNumber={ballNumber}
                onIncrement={incrementCount}
                onDecrement={decrementCount}
                onPlay={onPlayGame}
              />
            );
          case 'ranking':
            return <RankingScreen ballRank={ballRank} onBack={onReadyGame} />;
          default:
            return null;
        }
      })()}
      <div className={clsx('dim', { disabled: gameStatus === 'playing' })} />
    </div>
  );
}
