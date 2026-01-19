import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionStatus } from '@apps-in-toss/framework';

export interface PermissionGateConfig {
  getPermission: () => Promise<PermissionStatus>;
  openPermissionDialog: () => Promise<PermissionStatus>;
  onPermissionRequested?: (status: PermissionStatus) => void;
}

interface UsePermissionGateReturn {
  permission: PermissionStatus | null;
  isRequestingPermission: boolean;
  isExecuting: boolean;
  ensureAndRun: <T>(fn: () => Promise<T>) => Promise<T | undefined>;
  checkPermission: () => Promise<PermissionStatus>;
  requestPermission: () => Promise<PermissionStatus>;
}

const isAllowed = (status: PermissionStatus) => status === 'allowed';

export function usePermissionGate(
  config: PermissionGateConfig
): UsePermissionGateReturn {
  const [permission, setPermission] = useState<PermissionStatus | null>(null);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const mountedRef = useRef<boolean>(false);
  const execCountRef = useRef<number>(0);
  const reqCountRef = useRef<number>(0);

  const runIfMounted = useCallback((fn: () => void) => {
    if (mountedRef.current) {
      fn();
    }
  }, []);

  const checkPermission = useCallback(async () => {
    const status = await config.getPermission();
    runIfMounted(() => setPermission(status));
    return status;
  }, [config, runIfMounted]);

  const requestPermission = useCallback(async () => {
    reqCountRef.current += 1;
    runIfMounted(() => setIsRequestingPermission(true));
    try {
      const status = await config.openPermissionDialog();
      runIfMounted(() => setPermission(status));
      config.onPermissionRequested?.(status);
      return status;
    } finally {
      reqCountRef.current -= 1;
      if (reqCountRef.current === 0) {
        runIfMounted(() => setIsRequestingPermission(false));
      }
    }
  }, [config, runIfMounted]);

  const ensureAndRun = useCallback(
    async <T>(fn: () => Promise<T>) => {
      const current = await checkPermission();
      const allowed =
        isAllowed(current) || isAllowed(await requestPermission());

      if (!allowed) {
        const error = new Error('권한을 거절했어요.');
        error.name = 'PermissionDeniedError';
        throw error;
      }

      execCountRef.current += 1;
      runIfMounted(() => setIsExecuting(true));
      try {
        const result = await fn();
        return result;
      } finally {
        execCountRef.current -= 1;

        if (execCountRef.current === 0) {
          runIfMounted(() => setIsExecuting(false));
        }
      }
    },
    [checkPermission, requestPermission, runIfMounted]
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    permission,
    isRequestingPermission,
    isExecuting,
    ensureAndRun,
    checkPermission,
    requestPermission,
  };
}
