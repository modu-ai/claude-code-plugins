import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { useAuth } from "hooks/useAuth";
import { useUserInfo } from "hooks/useUserInfo";
import { LoadingView } from "components/LoadingView";
import { ErrorView } from "components/ErrorView";
import { Visibility } from "components/ui/Visibility";
import { LoginStateView } from "components/LoginStateView";
import { UserInfoView } from "components/UserInfoView";
import { Button, Text, useToast } from "@toss/tds-react-native";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const auth = useAuth();
  const user = useUserInfo();
  const toast = useToast();
  const isLoading = auth.loading || user.loading;
  const hasAccessToken = auth.accessToken !== null;

  const handleLogout = async (
    logoutFn: () => Promise<{ ok: boolean } | null>
  ) => {
    const res = await logoutFn();
    if (res?.ok) user.clearUserInfo();
  };

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        앱 로그인 예제
      </Text>
      <LoadingView loading={isLoading}>
        <ErrorView error={auth.error || user.error}>
          <LoginStateView accessToken={auth.accessToken} />
          <UserInfoView userInfo={user.userInfo} />
        </ErrorView>
      </LoadingView>
      <Visibility visible={auth.accessToken === null}>
        <Button display="block" onPress={auth.login} disabled={isLoading}>
          토스 로그인하기
        </Button>
      </Visibility>
      <Visibility visible={hasAccessToken}>
        <View style={styles.buttons}>
          <Button
            display="block"
            onPress={auth.refreshAccessToken}
            disabled={isLoading}
          >
            AccessToken 재발급
          </Button>
          <Button
            display="block"
            onPress={() => {
              if (auth.accessToken) user.getUserInfo(auth.accessToken);
            }}
            disabled={isLoading}
          >
            유저 정보 불러오기
          </Button>
          <Button
            display="block"
            onPress={() => handleLogout(auth.logoutByAccessToken)}
            disabled={isLoading}
          >
            토큰으로 로그아웃하기
          </Button>
          <Button
            display="block"
            onPress={async () => {
              const userKey = user.userInfo?.userKey;

              if (userKey) {
                await handleLogout(() => auth.logoutByUserKey(`${userKey}`));
                return;
              }
              toast.open(
                `유저 키가 필요해요. 유저 정보 불러오기를 실행해 유저 정보를 먼저 가져와 주세요.`
              );
            }}
            disabled={isLoading}
          >
            유저 키로 로그아웃하기
          </Button>
        </View>
      </Visibility>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
  },
  buttons: {
    gap: 12,
  },
});
