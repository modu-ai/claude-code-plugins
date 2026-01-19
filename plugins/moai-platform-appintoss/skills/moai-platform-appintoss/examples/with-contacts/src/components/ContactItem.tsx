import { StyleSheet } from "react-native";
import { ListRow, colors } from "@toss/tds-react-native";

interface ContentItemProps {
  name: string;
  phoneNumber: string;
}

export function ContactItem({ name, phoneNumber }: ContentItemProps) {
  return (
    <ListRow
      containerStyle={styles.container}
      withArrow
      left={
        <ListRow.Icon
          style={styles.avatar}
          type="background"
          name="bank-toss"
        />
      }
      contents={
        <ListRow.Texts type="2RowTypeA" top={name} bottom={phoneNumber} />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey50,
    borderRadius: 20,
  },
  avatar: {
    backgroundColor: colors.white,
  },
});
