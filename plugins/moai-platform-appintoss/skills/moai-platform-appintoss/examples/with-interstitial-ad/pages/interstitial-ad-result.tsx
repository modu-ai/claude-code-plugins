import { StyleSheet, View } from "react-native";
import { createRoute, useNavigation } from "@granite-js/react-native";
import { Button, Text } from "@toss/tds-react-native";
import { TextBox } from "components/TextBox";

export const Route = createRoute("/interstitial-ad-result", {
  validateParams: (params) => params,
  component: AdResult,
});

function AdResult() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        광고 시청 후 콘텐츠
      </Text>
      <TextBox text="광고는 화면 이동 전에 보여줘야 사용자 흐름이 자연스러워요. 이 방식은 Google AdMob에서도 권장하고 있어요." />
      <Button display="block" onPress={() => navigation.goBack()}>
        페이지 이동하기
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
