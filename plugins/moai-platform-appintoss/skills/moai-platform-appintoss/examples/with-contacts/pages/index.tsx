import { StyleSheet, FlatList, View } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { useContacts } from "hooks/useContacts";
import { Button, Text } from "@toss/tds-react-native";
import { ContactItem } from "components/ContactItem";
import { FlatListFooter } from "components/ListFooter";
import { Visibility } from "components/Visibility";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const { contacts, done, reloadContacts, permission } = useContacts();

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        연락처 예제
      </Text>
      <Visibility visible={permission === "denied"}>
        <View style={styles.requestButton}>
          <Button display="block" onPress={reloadContacts}>
            다시 요청하기
          </Button>
        </View>
      </Visibility>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={contacts}
        renderItem={({ item }) => (
          <ContactItem name={item.name} phoneNumber={item.phoneNumber} />
        )}
        ListFooterComponent={<FlatListFooter done={done} />}
        onEndReached={reloadContacts}
        onEndReachedThreshold={0.6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  requestButton: {
    marginHorizontal: 20,
  },
});
