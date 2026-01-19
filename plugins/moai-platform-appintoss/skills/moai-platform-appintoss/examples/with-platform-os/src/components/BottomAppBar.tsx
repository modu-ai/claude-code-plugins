import { getPlatformOS } from "@apps-in-toss/framework";
import { StyleSheet, View } from "react-native";
import { colors } from "@toss/tds-react-native";

const ITEM_COUNT = 4;

export function BottomAppBar() {
  const isIOS = getPlatformOS() === "ios";
  const barStyle = isIOS ? styles.iosBarStyle : styles.androidBarStyle;

  return (
    <View style={[styles.barBaseStyle, barStyle]}>
      {Array.from({ length: ITEM_COUNT }).map((_, i) => (
        <View key={i} style={styles.item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  barBaseStyle: {
    position: "absolute",
    left: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 35,
    width: "100%",
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.grey50,
  },
  iosBarStyle: {
    bottom: 35,
    shadowColor: colors.greyOpacity400,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  androidBarStyle: {
    bottom: 20,
    shadowColor: colors.greyOpacity400,
    elevation: 6,
  },
  item: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.grey300,
  },
});
