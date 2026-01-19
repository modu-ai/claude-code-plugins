import { share } from "@apps-in-toss/framework";
import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { Button, Text } from "@toss/tds-react-native";
import {
  getTossShareLink,
  getOperationalEnvironment,
} from "@apps-in-toss/framework";
import { Visibility } from "components/Visibility";
import { TextBox } from "components/TextBox";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

const INTOSS_PREFIX = "intoss";

export function Index() {
  const isSandbox = getOperationalEnvironment() === "sandbox";

  const handleShareLink = async (link: string) => {
    try {
      const tossLink = await getTossShareLink(link);
      await share({ message: tossLink });
    } catch (error) {
      console.error(error);
      Alert.alert("링크를 공유하는 중 오류가 발생했어요. 다시 시도해 주세요.");
    }
  };
  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        링크 공유 예제
      </Text>
      <Visibility visible={isSandbox === true}>
        <TextBox text="샌드박스 앱에서는 개발자 로그인이 필요해요." />
      </Visibility>
      <Button
        display="block"
        onPress={() =>
          handleShareLink(`${INTOSS_PREFIX}://with-share-link/shared`)
        }
      >
        프로필 공유하기
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
