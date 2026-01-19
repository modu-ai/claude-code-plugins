import {
  isMinVersionSupported,
  openGameCenterLeaderboard,
  getOperationalEnvironment,
} from '@apps-in-toss/web-framework';

interface RankButtonProps {
  isGameEnd: boolean;
  isDrop: boolean;
  loading: boolean;
  resetGameState: () => void;
}

/**
 * 랭킹 기능 지원 버전
 * 버전 확인 시 사용
 */
const SUPPORTED_VERSION = {
  android: '5.221.0',
  ios: '5.221.0',
} as const;

export const RankButton = ({
  isGameEnd,
  isDrop,
  loading,
  resetGameState,
}: RankButtonProps) => {
  const handleRank = () => {
    const isSupported = isMinVersionSupported({
      android: SUPPORTED_VERSION.android,
      ios: SUPPORTED_VERSION.ios,
    });
    const operationalEnvironment = getOperationalEnvironment();

    if (isSupported === false) {
      alert('지원하지 않는 앱 버전이에요.');
      return;
    }

    if (operationalEnvironment === 'sandbox') {
      alert('랭킹 기능은 샌드박스 환경에서는 사용할 수 없어요.');
      return;
    }

    openGameCenterLeaderboard();
    resetGameState();
  };

  return (
    <button
      className="button-base game-rank-button"
      onClick={handleRank}
      disabled={loading}
      style={{
        opacity: isGameEnd ? 1 : 0,
        pointerEvents: isGameEnd ? 'auto' : 'none',
        display: isDrop ? 'none' : 'flex',
      }}
    >
      Rank
    </button>
  );
};
