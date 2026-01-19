interface ReplayButtonProps {
  isGameEnd: boolean;
  loading: boolean;
  resetGameState: () => void;
}

export const ReplayButton = ({
  isGameEnd,
  loading,
  resetGameState,
}: ReplayButtonProps) => {
  const handleReplay = () => {
    resetGameState();
  };

  return (
    <button
      className="button-base game-replay-button"
      onClick={handleReplay}
      disabled={loading}
      style={{
        opacity: isGameEnd ? 1 : 0,
        pointerEvents: isGameEnd ? 'auto' : 'none',
      }}
    >
      Replay
    </button>
  );
};
