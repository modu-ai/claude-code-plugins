import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { colors, Text } from "@toss/tds-react-native";
import { TextBox } from "components/TextBox";
import { PROFILE } from "constants/profile";

export const Route = createRoute("/shared", {
  validateParams: (params) => params,
  component: Shared,
});

function Shared() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <View style={styles.avatarHead} />
        <View style={styles.avatarBody} />
      </View>
      <Text typography="t1" fontWeight="bold" style={styles.name}>
        {PROFILE.name}
      </Text>
      <Text typography="st10" fontWeight="medium" style={styles.job}>
        {PROFILE.job}
      </Text>
      <TextBox text={`이메일: ${PROFILE.email}`} />
      <TextBox text={`연락처: ${PROFILE.phone}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  avatar: {
    width: 194,
    height: 194,
    borderRadius: 97,
    backgroundColor: colors.grey100,
    overflow: "hidden",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarHead: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.grey300,
    marginTop: 58,
    marginBottom: 8,
  },
  avatarBody: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: colors.grey300,
  },
  name: {
    color: colors.grey700,
    marginBottom: 4,
  },
  job: {
    color: colors.grey500,
    marginBottom: 30,
  },
});
