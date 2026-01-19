import { StyleSheet, View } from "react-native";
import { Image } from "@granite-js/react-native";
import { Text, colors } from "@toss/tds-react-native";
import { ImageState } from "hooks/useCamera";

interface PhotoViewProps {
  image: ImageState | null;
}

export function PhotoView({ image }: PhotoViewProps) {
  return (
    <View style={styles.container}>
      {image ? (
        <Image
          key={image.id}
          source={{ uri: image.previewUri }}
          style={styles.photo}
        />
      ) : (
        <Text typography="st11" color={colors.grey500}>
          사진이 없어요.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "auto",
    aspectRatio: 1 / 1,
    backgroundColor: colors.grey100,
    borderRadius: 16,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});
