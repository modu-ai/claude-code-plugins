import { useCallback, useState } from "react";
import { ImageResponse, openCamera } from "@apps-in-toss/framework";
import { usePermissionGate } from "hooks/usePermissionGate";
import { useToast } from "@toss/tds-react-native";

export interface ImageState extends ImageResponse {
  previewUri: string;
}

interface UseCameraProps {
  base64?: boolean;
}

export function useCamera({ base64 = false }: UseCameraProps) {
  const [image, setImage] = useState<ImageState | null>(null);
  const toast = useToast();
  const permissionGate = usePermissionGate({
    getPermission: () => openCamera.getPermission(),
    openPermissionDialog: () => openCamera.openPermissionDialog(),
    onPermissionRequested: (status) => console.log(`권한 요청 결과: ${status}`),
  });

  const capturePhoto = useCallback(async () => {
    try {
      const response = await permissionGate.ensureAndRun(() =>
        openCamera({ base64 })
      );

      if (!response) {
        return;
      }

      const newImage: ImageState = {
        ...response,
        previewUri: base64
          ? `data:image/jpeg;base64,${response.dataUri}`
          : response.dataUri,
      };

      setImage(newImage);
    } catch (error) {
      let errorMessage = "카메라를 불러오는 데 실패했어요.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.open(`${errorMessage}`);
    }
  }, [base64, permissionGate]);

  const clearPhoto = useCallback(() => {
    setImage(null);
  }, []);

  return { image, capturePhoto, clearPhoto };
}
