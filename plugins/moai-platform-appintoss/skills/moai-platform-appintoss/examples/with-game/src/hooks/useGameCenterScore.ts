import { useCallback, useEffect, useState } from 'react';
import {
  getOperationalEnvironment,
  submitGameCenterLeaderBoardScore,
} from '@apps-in-toss/web-framework';

interface GameCenterScoreProps {
  score: number;
  isGameEnd: boolean;
}

interface GameCenterScoreResult {
  loading: boolean;
}

export const useGameCenterScore = ({
  score,
  isGameEnd,
}: GameCenterScoreProps): GameCenterScoreResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const operationalEnvironment = getOperationalEnvironment();

  const submitScore = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const result = await submitGameCenterLeaderBoardScore({
        score: score.toFixed(1),
      });

      if (!result) {
        alert('지원하지 않는 앱 버전이에요.');
        return;
      }

      if (result.statusCode !== 'SUCCESS') {
        alert(`점수 제출 실패: ${result.statusCode}`);
      }
    } catch (error) {
      alert(`점수 제출 중 오류가 발생했어요. ${error}`);
    } finally {
      setLoading(false);
    }
  }, [score]);

  useEffect(() => {
    const isDrop = score === -Infinity;
    const shouldSubmitScore =
      isGameEnd &&
      isDrop === false &&
      loading === false &&
      operationalEnvironment === 'toss';

    if (shouldSubmitScore) {
      submitScore();
    }
  }, [isGameEnd, submitScore]);

  return { loading };
};
