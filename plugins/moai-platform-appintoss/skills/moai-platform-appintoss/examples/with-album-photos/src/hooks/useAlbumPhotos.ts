import { useState, useCallback } from 'react';
import { fetchAlbumPhotos, ImageResponse } from '@apps-in-toss/framework';
import { usePermissionGate } from './usePermissionGate';
import { useToast } from '@toss/tds-react-native';

export interface ImageState extends ImageResponse {
  previewUri: string;
}

interface UseAlbumPhotosProps {
  base64?: boolean;
}

export function useAlbumPhotos({ base64 = false }: UseAlbumPhotosProps) {
  const [albumPhotos, setAlbumPhotos] = useState<ImageState[]>([]);
  const toast = useToast();
  const permissionGate = usePermissionGate({
    getPermission: () => fetchAlbumPhotos.getPermission(),
    openPermissionDialog: () => fetchAlbumPhotos.openPermissionDialog(),
    onPermissionRequested: (status) => console.log(`권한 요청 결과: ${status}`),
  });

  const loadPhotos = useCallback(async () => {
    try {
      const response = await permissionGate.ensureAndRun(() =>
        fetchAlbumPhotos({ maxWidth: 360, base64 })
      );

      if (!response) {
        return;
      }

      const newImages = response.map((img) => ({
        ...img,
        previewUri: base64
          ? `data:image/jpeg;base64,${img.dataUri}`
          : img.dataUri,
      }));

      setAlbumPhotos((prev) => [...prev, ...newImages]);
    } catch (error) {
      let errorMessage = '앨범을 가져오는 데 실패했어요';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.open(`${errorMessage}`);
    }
  }, [base64]);

  const deletePhoto = useCallback((id: string) => {
    setAlbumPhotos((prev) => prev.filter((album) => album.id !== id));
  }, []);

  return { albumPhotos, loadPhotos, deletePhoto };
}
