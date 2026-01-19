import { getPlatformOS } from "@apps-in-toss/framework";
import { StyleSheet, View } from "react-native";
import { colors, Text } from "@toss/tds-react-native";

export function Card() {
  const isIOS = getPlatformOS() === "ios";
  const titleText = isIOS ? "iOS 사용자에요." : "안드로이드 사용자에요.";
  const cardShadow = isIOS ? styles.iosShadow : styles.androidShadow;

  return (
    <View style={[styles.card, cardShadow]}>
      <View style={styles.thumbnail} />
      <Text typography="st5" fontWeight="bold" style={styles.title}>
        {titleText}
      </Text>
      <Text typography="st12" style={styles.keyword}>
        @platformOS
      </Text>
      <Text typography="st11" style={styles.description}>
        iOS와 안드로이드는 스타일과 유저 경험이 달라요. 플랫폼에 따라 UI 구성과
        동작을 최적화해서, 사용자에게 가장 자연스럽고 익숙한 경험을 제공할 수
        있어요.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "auto",
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingTop: 14,
    paddingHorizontal: 14,
    paddingBottom: 28,
  },
  iosShadow: {
    shadowColor: colors.greyOpacity400,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  androidShadow: {
    shadowColor: colors.greyOpacity400,
    elevation: 6,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    backgroundColor: colors.grey300,
    borderRadius: 14,
    marginBottom: 16,
  },
  title: {
    color: colors.grey600,
    marginBottom: 6,
    paddingHorizontal: 6,
  },
  keyword: {
    color: colors.grey500,
    marginBottom: 20,
    paddingHorizontal: 6,
  },
  description: {
    color: colors.grey600,
    paddingHorizontal: 6,
  },
});
