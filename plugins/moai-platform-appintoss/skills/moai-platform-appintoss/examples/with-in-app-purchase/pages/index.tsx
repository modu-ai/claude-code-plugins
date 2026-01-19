import { useCallback } from "react";
import { createRoute, useNavigation } from "@granite-js/react-native";
import { List, ListRow, Text, Txt } from "@toss/tds-react-native";
import { IapProductListItem } from "@apps-in-toss/framework";
import { ProductListEmpty } from "components/ProductListEmpty";
import { StyleSheet, View } from "react-native";
import { useIapProductList } from "hooks/useIapProductList";
import { LoadingView } from "components/LoadingView";

export const Route = createRoute("/", {
  validateParams: (params) => params,
  component: Index,
});

export function Index() {
  const navigation = useNavigation();
  const { products, loading } = useIapProductList();

  const handleNavigate = useCallback(
    (product: IapProductListItem) => {
      navigation.navigate("/detail", { product });
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <Text typography="st5" fontWeight="extraBold" style={styles.title}>
        인앱 결제 예제
      </Text>
      <LoadingView loading={loading}>
        <List>
          {products.map((product) => (
            <ListRow
              key={product.sku}
              left={
                <ListRow.Image
                  type="square"
                  source={{ uri: product.iconUrl }}
                />
              }
              contents={<Txt>{product.displayName}</Txt>}
              withArrow={true}
              onPress={() => handleNavigate(product)}
            />
          ))}
        </List>
        <ProductListEmpty productsLength={products.length} />
      </LoadingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
