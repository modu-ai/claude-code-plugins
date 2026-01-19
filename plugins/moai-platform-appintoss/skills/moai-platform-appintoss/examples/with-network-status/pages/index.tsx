import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { useNetworkStatus } from "hooks/useNetworkStatus";
import { LoadingView } from "components/LoadingView";
import { OfflineVideoNotice } from "components/OfflineVideoNotice";
import { WifiVideoPlayer } from "components/WifiVideoPlayer";
import { CellularVideoPlayer } from "components/CellularVideoPlayer";
import { Text } from "@toss/tds-react-native";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const { loading, refetch, status } = useNetworkStatus();

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        네트워크 상태 예제
      </Text>
      <LoadingView loading={loading}>
        {(() => {
          switch (status) {
            case "OFFLINE":
            case null:
              return <OfflineVideoNotice reloadNetworkStatus={refetch} />;
            case "WIFI":
              return <WifiVideoPlayer />;
            default:
              return <CellularVideoPlayer />;
          }
        })()}
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
