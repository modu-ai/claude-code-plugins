interface FlipCardProps {
  isFlipped: boolean;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function FlipCard({
  isFlipped,
  frontContent,
  backContent,
  className = '',
  style,
}: FlipCardProps) {
  return (
    <div className={`cell-flip-container ${className}`} style={style}>
      <div className={`cell-flip ${isFlipped ? 'flipped' : ''}`}>
        <div className="cell-front">{frontContent}</div>
        <div className="cell-back">{backContent}</div>
      </div>
    </div>
  );
}
