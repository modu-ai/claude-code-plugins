import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { useGeolocation, Accuracy } from "@apps-in-toss/framework";
import { LoadingView } from "components/LoadingView";
import { TextBox } from "components/ui/TextBox";
import { Text } from "@toss/tds-react-native";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

/** 10m 이동될 때마다 이벤트를 받아요. */
const SEARCH_RADIUS_M = 10;
/** 1000ms 간격으로 위치 정보를 업데이트해요. */
const FETCH_INTERVAL_MS = 1000;

export function Index() {
  const location = useGeolocation({
    accuracy: Accuracy.Balanced,
    distanceInterval: SEARCH_RADIUS_M,
    timeInterval: FETCH_INTERVAL_MS,
  });

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        실시간 위치 정보 예제
      </Text>
      <LoadingView loading={location === null}>
        <TextBox text={`위도: ${location?.coords.latitude}`} />
        <TextBox text={`경도: ${location?.coords.longitude}`} />
      </LoadingView>
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
