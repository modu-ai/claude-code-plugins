import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { colors } from "@toss/tds-react-native";
import { BottomAppBar } from "components/BottomAppBar";
import { Card } from "components/Card";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  return (
    <View style={styles.container}>
      <Card />
      <BottomAppBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    backgroundColor: colors.grey100,
  },
});
