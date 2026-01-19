import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { useEnvironmentDetails } from "hooks/useEnvironmentDetails";
import { TextBox } from "components/TextBox";
import { EnvironmentInfoView } from "components/EnvironmentInfoView";
import { ErrorView } from "components/ErrorView";
import { Text } from "@toss/tds-react-native";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const envDetails = useEnvironmentDetails();
  const isSandbox = useMemo(
    () => envDetails.info?.environment === "sandbox",
    [envDetails.info]
  );

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        운영 환경 예제
      </Text>
      <ErrorView error={envDetails.error}>
        {isSandbox ? (
          <EnvironmentInfoView environmentInfo={envDetails.info} />
        ) : (
          <TextBox text="Toss 앱에서는 디버그 정보를 볼 수 없어요." />
        )}
      </ErrorView>
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
