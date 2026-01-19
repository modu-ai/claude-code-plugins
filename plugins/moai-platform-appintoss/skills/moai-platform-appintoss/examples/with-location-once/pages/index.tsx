import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { ErrorView } from "components/ErrorView";
import { LoadingView } from "components/LoadingView";
import { useCurrentLocation } from "hooks/useCurrentLocation";
import { TextBox } from "components/ui/TextBox";
import { Button, Text } from "@toss/tds-react-native";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const { location, loading, error, reloadLocation } = useCurrentLocation();

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        현재 위치 정보 예제
      </Text>
      <LoadingView loading={loading}>
        <ErrorView error={error}>
          <TextBox text={`위도: ${location?.coords.latitude}`} />
          <TextBox text={`경도: ${location?.coords.longitude}`} />
        </ErrorView>
      </LoadingView>
      <Button display="block" onPress={reloadLocation} disabled={loading}>
        다시 불러오기
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
