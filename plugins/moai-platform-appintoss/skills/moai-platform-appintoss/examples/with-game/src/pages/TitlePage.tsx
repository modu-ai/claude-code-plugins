import { useNavigate } from '@tanstack/react-router';

export function TitlePage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="title-bg"></div>
      <div className="title-container">
        <h1 className="title">Example Game</h1>
        <button
          className="button-base start-button"
          onClick={() => {
            navigate({ to: '/game' });
          }}
        >
          Start 🎮
        </button>
      </div>
    </div>
  );
}
