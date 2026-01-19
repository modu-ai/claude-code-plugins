import { GameButton } from './GameButton';
import { NumberField } from './NumberField';

interface ReadyScreenProps {
  ballNumber: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onPlay: () => void;
}

export function ReadyScreen({
  ballNumber,
  onIncrement,
  onDecrement,
  onPlay,
}: ReadyScreenProps) {
  return (
    <div className="front-screen">
      <img className="logo" src="/random-balls-logo.png" alt="logo image" />
      <NumberField
        value={ballNumber}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />
      <GameButton label="PLAY" onClick={onPlay} />
    </div>
  );
}
