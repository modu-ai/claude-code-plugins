import { useEffect, useState, useCallback } from "react";
import {
  Accuracy,
  getCurrentLocation,
  Location,
} from "@apps-in-toss/framework";
import { usePermissionGate } from "./usePermissionGate";
import { useToast } from "@toss/tds-react-native";

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const permissionGate = usePermissionGate({
    getPermission: () => getCurrentLocation.getPermission(),
    openPermissionDialog: () => getCurrentLocation.openPermissionDialog(),
    onPermissionRequested: (status) => toast.open(`권한 요청 결과: ${status}`),
  });

  const fetchLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await permissionGate.ensureAndRun(() =>
        getCurrentLocation({ accuracy: Accuracy.Balanced })
      );

      if (!response) {
        return;
      }

      setLocation(response);
    } catch (error) {
      let errorMessage = "위치 정보를 가져오는 데 실패했어요.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocation();
  }, []);

  return { location, loading, error, reloadLocation: fetchLocation };
}
