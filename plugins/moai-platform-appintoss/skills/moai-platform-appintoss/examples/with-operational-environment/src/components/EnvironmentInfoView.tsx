import { type EnvironmentDetails } from "hooks/useEnvironmentDetails";
import { FlatList, StyleSheet } from "react-native";
import { TextBox } from "./TextBox";
import { colors, ListRow } from "@toss/tds-react-native";

interface EnvironmentInfoViewProps {
  environmentInfo: EnvironmentDetails | null;
}

const INFO_LABEL: Record<keyof EnvironmentDetails, string> = {
  environment: "실행 환경",
  networkStatus: "네트워크 상태",
  locale: "사용자 언어",
  schemeUri: "스킴 URI",
  platformOS: "운영체제(OS)",
  deviceId: "디바이스 ID",
};

export function EnvironmentInfoView({
  environmentInfo,
}: EnvironmentInfoViewProps) {
  if (environmentInfo == null) {
    return <TextBox text="환경 정보를 불러올 수 없어요." />;
  }

  const infoData = (
    Object.keys(INFO_LABEL) as (keyof EnvironmentDetails)[]
  ).map((key) => ({
    label: INFO_LABEL[key],
    value: environmentInfo[key] || "정보가 없어요.",
  }));

  return (
    <FlatList
      style={styles.listContainer}
      data={infoData}
      keyExtractor={(item) => item.label}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <ListRow
          verticalPadding="extraSmall"
          contents={
            <ListRow.Texts
              type="2RowTypeA"
              top={item.label}
              topProps={{
                style: styles.infoTextColor,
              }}
              bottom={item.value}
              bottomProps={{
                style: styles.infoTextColor,
              }}
            />
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.blue50,
    borderRadius: 16,
    paddingVertical: 20,
  },
  infoTextColor: {
    color: colors.blue600,
  },
});
