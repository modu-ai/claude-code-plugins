interface PlayingScreenProps {
  countdown: number;
}

export function PlayingScreen({ countdown }: PlayingScreenProps) {
  if (countdown <= 0) {
    return null;
  } else {
    return <div className="end-time-text active">{countdown}</div>;
  }
}
