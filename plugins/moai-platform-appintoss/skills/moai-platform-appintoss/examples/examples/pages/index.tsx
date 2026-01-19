import { getPlatformOS } from "@apps-in-toss/framework";
import { FlatList, StyleSheet } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { List, ListHeader } from "@toss/tds-react-native";
import { ExampleListItem } from "components/ExampleListItem";
import { exampleList } from "constants/exampleList";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const platformOS = getPlatformOS();

  return (
    <List style={styles.container}>
      <ListHeader
        upper={
          <ListHeader.DescriptionParagraph>
            Apps in Toss
          </ListHeader.DescriptionParagraph>
        }
        title={
          <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
            Examples
          </ListHeader.TitleParagraph>
        }
      />
      <FlatList
        contentContainerStyle={styles[platformOS]}
        data={exampleList}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <ExampleListItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        )}
      />
    </List>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ios: { paddingBottom: 35 },
  android: { paddingBottom: 20 },
});
