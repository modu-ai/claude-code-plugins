import { useEffect, useState, useCallback } from 'react';
import { getNetworkStatus, NetworkStatus } from '@apps-in-toss/framework';

export function useNetworkStatus() {
  const [status, setStatus] = useState<NetworkStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const networkStatus = await getNetworkStatus();
      setStatus(networkStatus);
    } catch (error) {
      console.error('❌ 네트워크 상태 가져오기 실패:', error);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    status,
    loading,
    refetch: fetchStatus,
  };
}
