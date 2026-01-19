import { share } from "@apps-in-toss/framework";
import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { Button, Text } from "@toss/tds-react-native";
import { TextBox } from "components/TextBox";
import { useClientKey } from "hooks/useClientKey";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const { key, masked } = useClientKey(6);

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        텍스트 공유 예제
      </Text>
      <TextBox text={`client key: ${masked}`} />
      <Button
        display="block"
        onPress={async () => {
          try {
            await share({ message: key });
          } catch (error) {
            console.error("공유 중 오류가 발생했습니다:", error);
          }
        }}
      >
        공유하기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
  },
});
