import { getLocale, getNetworkStatus, getSchemeUri, getPlatformOS } from "@apps-in-toss/framework";
import { useEffect, useState } from 'react';
import { type NetworkStatus } from "@granite-js/react-native";
import {
  getOperationalEnvironment,
  getDeviceId,
} from '@apps-in-toss/framework';

export interface EnvironmentDetails {
  environment: 'toss' | 'sandbox';
  deviceId: string;
  platformOS: 'ios' | 'android';
  schemeUri: string;
  networkStatus: NetworkStatus;
  locale: string;
}

export function useEnvironmentDetails() {
  const [info, setInfo] = useState<EnvironmentDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEnvironmentDetails() {
      try {
        const networkStatus = await getNetworkStatus();

        setInfo({
          environment: getOperationalEnvironment(),
          deviceId: getDeviceId(),
          platformOS: getPlatformOS(),
          schemeUri: getSchemeUri(),
          locale: getLocale(),
          networkStatus,
        });
      } catch (error) {
        console.error('환경 정보 가져오기 실패:', error);
        setInfo(null);
        setError('알 수 없는 오류가 발생했어요.');
      }
    }

    fetchEnvironmentDetails();
  }, []);

  return {
    info,
    error,
  };
}
