import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { TextBox } from "components/TextBox";
import { KeyboardDismissView } from "components/KeyboardDismissView";
import { DraftInput } from "components/DraftInput";
import { Text } from "@toss/tds-react-native";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  return (
    <KeyboardDismissView>
      <View style={styles.container}>
        <Text typography="st5" fontWeight="extraBold" style={styles.title}>
          저장소 예제
        </Text>
        <TextBox text="다시 실행해도 입력하던 내용을 불러올 수 있어요." />
        <DraftInput storageKey="DRAFT_MESSAGE" />
      </View>
    </KeyboardDismissView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
  },
});
