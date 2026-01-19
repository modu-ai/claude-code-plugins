import { getRanks } from '../../utils/getRanks';
import { GameButton } from './GameButton';

interface RankingScreenProps {
  ballRank: number[];
  onBack: () => void;
}

export function RankingScreen({ ballRank, onBack }: RankingScreenProps) {
  return (
    <div className="rank-screen">
      <div className="game-rank-title-wrapper">
        <span className="game-rank-title">GAME RANK</span>
        <span className="game-rank-title-shadow">GAME RANK</span>
      </div>
      <div className="rank-list">
        {ballRank.map((ballNumber, index) => (
          <div
            key={`${index}-${ballNumber}`}
            className={`rank-item-${index + 1}`}
          >
            <span className="rank-number">{getRanks(index + 1)}</span>
            <span className="ball-number">Ball {ballNumber}</span>
          </div>
        ))}
      </div>
      <GameButton label="BACK" onClick={onBack} />
    </div>
  );
}
