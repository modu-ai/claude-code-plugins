import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { useCamera } from "hooks/useCamera";
import { PhotoView } from "components/PhotoView";
import { Button } from "@toss/tds-react-native";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const { image, capturePhoto, clearPhoto } = useCamera({ base64: true });

  return (
    <View style={styles.container}>
      <PhotoView image={image} />
      <View style={styles.buttons}>
        <Button viewStyle={styles.button} onPress={capturePhoto}>
          촬영하기
        </Button>
        <Button viewStyle={styles.button} type="dark" onPress={clearPhoto}>
          삭제하기
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  buttons: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 8,
  },
  button: {
    flex: 1,
  },
});
