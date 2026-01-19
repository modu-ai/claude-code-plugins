import { StyleSheet } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { Text } from "@toss/tds-react-native";
import { CopyToClipboard } from "components/CopyToClipboard";
import { PasteFromClipboard } from "components/PasteFromClipboard";
import { KeyboardDismissView } from "components/KeyboardDismissView";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  return (
    <KeyboardDismissView>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        클립보드 텍스트 예제
      </Text>
      <CopyToClipboard />
      <PasteFromClipboard />
    </KeyboardDismissView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
