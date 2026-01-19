import { ListFooter, colors } from "@toss/tds-react-native";

interface FlatListFooterProps {
  done: boolean;
}

export function FlatListFooter({ done }: FlatListFooterProps) {
  if (!done) {
    return null;
  }

  return (
    <ListFooter
      title={
        <ListFooter.Title typography="st10" color={colors.grey400}>
          전부 불러왔어요.
        </ListFooter.Title>
      }
      borderType="none"
    />
  );
}
