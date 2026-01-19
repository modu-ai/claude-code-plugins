import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@granite-js/native/@react-navigation/native';
import { GoogleAdMob } from '@apps-in-toss/framework';

const TEST_AD_GROUP_ID = 'ait-ad-test-interstitial-id';

interface InterstitialAdCallback {
  onDismiss?: () => void;
}

export function useInterstitialAd() {
  const [loading, setLoading] = useState(true);
  const dismissCallbackRef = useRef<(() => void) | undefined>();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      const isAdUnsupported =
        GoogleAdMob.loadAppsInTossAdMob.isSupported?.() === false;

      if (isAdUnsupported) {
        console.warn('광고가 준비되지 않았거나, 지원되지 않아요.');
        return;
      }

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

      return cleanup;
    }, [])
  );

  const showInterstitialAd = ({ onDismiss }: InterstitialAdCallback) => {
    const isAdUnsupported =
      GoogleAdMob.showAppsInTossAdMob.isSupported?.() === false;

    if (loading || isAdUnsupported) {
      console.warn('광고가 준비되지 않았거나, 지원되지 않아요.');
      return;
    }

    dismissCallbackRef.current = onDismiss;

    GoogleAdMob.showAppsInTossAdMob({
      options: {
        adGroupId: TEST_AD_GROUP_ID,
      },
      onEvent: (event) => {
        switch (event.type) {
          case 'requested':
            setLoading(false);
            break;

          case 'clicked':
            // 사용자가 광고를 클릭했어요.
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
            // 광고 컨텐츠가 노출되기 시작했어요.
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
    showInterstitialAd,
  };
}
