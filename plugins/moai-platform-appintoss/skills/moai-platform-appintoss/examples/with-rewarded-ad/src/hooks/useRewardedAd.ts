import { useCallback, useRef, useState } from 'react';
import { GoogleAdMob } from '@apps-in-toss/framework';
import { useFocusEffect } from '@granite-js/native/@react-navigation/native';

const TEST_AD_GROUP_ID = 'ait-ad-test-rewarded-id';

interface RewardedAdCallbacks {
  onRewarded?: () => void;
  onDismiss?: () => void;
}

export function useRewardedAd() {
  const [loading, setLoading] = useState(true);
  const cleanupRef = useRef<(() => void) | undefined>();
  const rewardCallbackRef = useRef<(() => void) | undefined>();
  const dismissCallbackRef = useRef<(() => void) | undefined>();

  const loadRewardAd = useCallback(() => {
    setLoading(true);

    const isAdUnsupported =
      GoogleAdMob.loadAppsInTossAdMob.isSupported?.() === false;

    if (isAdUnsupported) {
      console.warn('광고가 준비되지 않았거나, 지원되지 않아요.');
      return;
    }

    cleanupRef.current?.();
    cleanupRef.current = undefined;

    const cleanup = GoogleAdMob.loadAppsInTossAdMob({
      options: {
        adGroupId: TEST_AD_GROUP_ID,
      },
      onEvent: (event) => {
        if (event.type === 'loaded') {
          setLoading(false);
        }
      },
      onError: (error) => {
        console.error('광고 로드 실패', error);
      },
    });

    cleanupRef.current = cleanup;
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRewardAd();

      return () => {
        cleanupRef.current?.();
      };
    }, [loadRewardAd])
  );

  const showRewardAd = ({ onRewarded, onDismiss }: RewardedAdCallbacks) => {
    const isAdUnsupported =
      GoogleAdMob.showAppsInTossAdMob.isSupported?.() === false;

    if (loading || isAdUnsupported) {
      console.warn('광고가 준비되지 않았거나, 지원되지 않아요.');
      return;
    }

    rewardCallbackRef.current = onRewarded;
    dismissCallbackRef.current = onDismiss;

    GoogleAdMob.showAppsInTossAdMob({
      options: {
        adGroupId: TEST_AD_GROUP_ID,
      },
      onEvent: (event) => {
        switch (event.type) {
          case 'requested':
            break;

          case 'dismissed':
            dismissCallbackRef.current?.();
            dismissCallbackRef.current = undefined;
            break;

          case 'failedToShow':
            // 광고를 보여주지 못했어요.
            break;

          case 'impression':
            // 광고가 화면에 노출됐어요.
            break;

          case 'show':
            // 광고 컨텐츠가 보여졌어요.
            break;

          case 'userEarnedReward':
            rewardCallbackRef.current?.();
            rewardCallbackRef.current = undefined;
            // 광고 시청 보상을 받았어요.
            break;
        }
      },
      onError: (error) => {
        console.error('광고 보여주기 실패', error);
      },
    });
  };

  return {
    loading,
    loadRewardAd,
    showRewardAd,
  };
}
