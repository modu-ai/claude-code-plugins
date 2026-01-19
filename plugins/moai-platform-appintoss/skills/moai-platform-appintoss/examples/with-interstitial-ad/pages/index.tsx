import { StyleSheet, View } from "react-native";
import { createRoute, useNavigation } from "@granite-js/react-native";
import { getOperationalEnvironment } from "@apps-in-toss/framework";
import { Button, Text } from "@toss/tds-react-native";
import { useInterstitialAd } from "hooks/useInterstitialAd";
import { Visibility } from "components/Visibility";
import { TextBox } from "components/TextBox";
import { LoadingView } from "components/LoadingView";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const currentEnv = getOperationalEnvironment();
  const navigation = useNavigation();
  const { loading, showInterstitialAd } = useInterstitialAd();

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        전면 광고 예제
      </Text>
      <Visibility visible={currentEnv === "toss"}>
        <LoadingView loading={loading}>
          <TextBox text="전면 광고는 앱 흐름 중간에 보여주는 광고에요." />
        </LoadingView>
      </Visibility>
      <Visibility visible={currentEnv === "sandbox"}>
        <TextBox text="전면 광고는 샌드박스 앱에서 테스트할 수 없어요." />
      </Visibility>
      <Button
        display="block"
        onPress={() => {
          showInterstitialAd({
            onDismiss: () => navigation.navigate("/interstitial-ad-result"),
          });
        }}
        disabled={loading}
      >
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
