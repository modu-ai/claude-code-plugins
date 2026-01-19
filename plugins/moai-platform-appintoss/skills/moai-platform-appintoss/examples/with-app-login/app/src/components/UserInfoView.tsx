import type { UserInfo } from "types/user";
import { FlatList, StyleSheet } from "react-native";
import { colors, TableRow } from "@toss/tds-react-native";

const USER_INFO_LABELS = [
  "name",
  "email",
  "gender",
  "nationality",
  "phone",
  "birthday",
] as const;

interface UserInfoViewProps {
  userInfo: UserInfo | null;
}

export function UserInfoView({ userInfo }: UserInfoViewProps) {
  const userInfoData = USER_INFO_LABELS.map((label) => ({
    label,
    value: userInfo?.[label as keyof UserInfo] ?? "",
  }));

  return (
    <FlatList
      style={styles.list}
      data={userInfoData}
      keyExtractor={(item) => item.label}
      renderItem={({ item }) => (
        <UserInfoViewItem label={item.label} value={item.value} />
      )}
    />
  );
}

interface UserInfoViewItemProps {
  label: string;
  value?: string | number | string[];
}

function UserInfoViewItem({ label, value }: UserInfoViewItemProps) {
  const displayValue = Array.isArray(value)
    ? value.join(", ")
    : value || "정보가 없어요.";

  return (
    <TableRow
      style={styles.item}
      align="left"
      left={
        <TableRow.LeftText color={colors.blue600} fontWeight="bold">
          {label}:
        </TableRow.LeftText>
      }
      right={
        <TableRow.RightText color={colors.blue600}>
          {displayValue}
        </TableRow.RightText>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.blue50,
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 12,
  },
  item: {
    paddingVertical: 6,
  },
  infoTextColor: {
    color: colors.blue600,
  },
});
