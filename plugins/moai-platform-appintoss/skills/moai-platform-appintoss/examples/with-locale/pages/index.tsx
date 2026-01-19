import { StyleSheet, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { useTranslation } from "react-i18next";
import { makeLocaleKeys } from "constants/i18nKeys";
import { Text } from "@toss/tds-react-native";
import { TextBox } from "components/ui/TextBox";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

const localeKeys = makeLocaleKeys("localeExample");

export function Index() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        {t(localeKeys.title)}
      </Text>
      <TextBox text={t(localeKeys.description)} />
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
