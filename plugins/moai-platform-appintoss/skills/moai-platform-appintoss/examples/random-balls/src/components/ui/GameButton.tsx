interface GameButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function GameButton({ label, ...props }: GameButtonProps) {
  return (
    <button type={props.type ?? 'button'} className="game-button" {...props}>
      <div className="game-button-surface">
        <div className="game-button-text-wrapper">
          <span className="game-button-text">{label}</span>
          <span className="game-button-text-shadow">{label}</span>
        </div>
      </div>
    </button>
  );
}
