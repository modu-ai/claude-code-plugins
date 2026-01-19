import { View, FlatList } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { useAlbumPhotos } from "hooks/useAlbumPhotos";
import { PhotoItem } from "components/PhotoItem";
import { Button, useDialog } from "@toss/tds-react-native";
import { useCallback } from "react";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const { albumPhotos, loadPhotos, deletePhoto } = useAlbumPhotos({
    base64: false,
  });
  const dialog = useDialog();

  const handlePhotoPress = useCallback(
    async (photoId: string) => {
      const isDeleteConfirmed = await dialog.openConfirm({
        title: "이미지 삭제",
        description: "선택한 이미지를 삭제할까요?",
      });

      if (isDeleteConfirmed) {
        deletePhoto(photoId);
      }
    },
    [dialog, deletePhoto]
  );

  return (
    <View>
      <Button display="full" onPress={loadPhotos}>
        앨범 가져오기
      </Button>
      <FlatList
        numColumns={3}
        data={albumPhotos}
        renderItem={({ item: photo }) => (
          <PhotoItem
            uri={photo.previewUri}
            onPress={() => handlePhotoPress(photo.id)}
          />
        )}
        keyExtractor={(album) => album.id}
      />
    </View>
  );
}
