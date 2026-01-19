import { useRef, useCallback, useState, useEffect } from 'react';
import {
  Accuracy,
  Location,
  startUpdateLocation,
} from '@apps-in-toss/framework';
import { useToast } from '@toss/tds-react-native';
import { getDistanceFromCurrentLocation } from 'utils/locationDistance';
import { usePermissionGate } from './usePermissionGate';

/**
 * 위치 관련 액션에 대해 정의한 사용자 메시지예요.
 * 현재 위치 저장, 추적 중지, 오류 발생 시 사용자에게 보여줄 메시지를 담고 있어요.
 */
const LOCATION_ACTIONS = {
  SAVED_LOCATION: '현재 위치를 기억했어요.',
  STOP_TRACKING: '위치 관찰을 중지했어요.',
  ERROR_LOCATION: '위치 정보를 가져오는데 실패했어요.',
} as const;

interface UseLocationWatcherProps {
  onDistanceInitial?: (initialLocation: Location) => void;
  onDistanceUpdate?: (distance: number) => void;
  onReset?: () => void;
}

export function useLocationWatcher({
  onDistanceInitial,
  onDistanceUpdate,
  onReset,
}: UseLocationWatcherProps) {
  const targetLocationRef = useRef<Location | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const permissionGate = usePermissionGate({
    getPermission: () => startUpdateLocation.getPermission(),
    openPermissionDialog: () => startUpdateLocation.openPermissionDialog(),
    onPermissionRequested: (status) => console.log(`권한 요청 결과: ${status}`),
  });

  const handleLocationUpdate = useCallback(
    (location: Location) => {
      if (targetLocationRef.current == null) {
        targetLocationRef.current = location;
        toast.open(LOCATION_ACTIONS.SAVED_LOCATION);

        if (onDistanceInitial != null) {
          onDistanceInitial(location);
        }
        return;
      }

      const distance = getDistanceFromCurrentLocation({
        current: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        target: {
          latitude: targetLocationRef.current.coords.latitude,
          longitude: targetLocationRef.current.coords.longitude,
        },
      });

      setCurrentDistance(distance);

      if (onDistanceUpdate != null) {
        onDistanceUpdate(distance);
      }
    },
    [onDistanceInitial, onDistanceUpdate]
  );

  const handleLocationError = useCallback(() => {
    toast.open(LOCATION_ACTIONS.ERROR_LOCATION);
  }, []);

  const startWatchingLocation = useCallback(async () => {
    if (unsubscribeRef.current != null) {
      return;
    }

    try {
      setError(null);
      const unsubscribe = await permissionGate.ensureAndRun(async () =>
        startUpdateLocation({
          options: {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 0.1,
          },
          onEvent: handleLocationUpdate,
          onError: handleLocationError,
        })
      );

      if (unsubscribe) {
        unsubscribeRef.current = unsubscribe;
      }
    } catch (error) {
      let errorMessage = '위치 정보를 가져오는 데 실패했어요.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    }
  }, [handleLocationUpdate, handleLocationError]);

  const stopWatchingLocation = useCallback(() => {
    if (unsubscribeRef.current != null) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    toast.open(LOCATION_ACTIONS.STOP_TRACKING);
    targetLocationRef.current = null;
    setCurrentDistance(0);

    if (onReset != null) {
      onReset();
    }
  }, [onReset]);

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current != null) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, []);

  return {
    isWatching: unsubscribeRef.current !== null,
    currentDistance,
    error,
    startWatchingLocation,
    stopWatchingLocation,
  };
}
