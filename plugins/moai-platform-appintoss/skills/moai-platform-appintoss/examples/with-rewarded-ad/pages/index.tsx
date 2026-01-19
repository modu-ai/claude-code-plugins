import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { getOperationalEnvironment } from "@apps-in-toss/framework";
import { Button, Text, useDialog } from "@toss/tds-react-native";
import { useRewardedAd } from "hooks/useRewardedAd";
import { Visibility } from "components/Visibility";
import { TextBox } from "components/TextBox";
import { LoadingView } from "components/LoadingView";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const currentEnv = getOperationalEnvironment();
  const { loading, loadRewardAd, showRewardAd } = useRewardedAd();
  const [reward, setReward] = useState<number>(0);
  const dialog = useDialog();

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        보상형 광고 예제
      </Text>
      <Visibility visible={currentEnv === "toss"}>
        <LoadingView loading={loading}>
          <TextBox text={`광고 보상: ${reward}/3 획득 완료`} />
        </LoadingView>
      </Visibility>
      <Visibility visible={currentEnv === "sandbox"}>
        <TextBox text="보상형 광고는 샌드박스 앱에서 테스트할 수 없어요." />
      </Visibility>
      <Button
        display="block"
        disabled={loading}
        onPress={() => {
          if (reward >= 3) {
            dialog.openAlert({ title: "오늘은 보상을 전부 받았어요." });
          } else {
            showRewardAd({
              onRewarded: () => setReward((current) => current + 1),
              onDismiss: () => {
                dialog.openAlert({ title: "🎁 보상이 지급되었어요." });
                loadRewardAd();
              },
            });
          }
        }}
      >
        보상받기
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
