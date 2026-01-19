import { View, Dimensions, StyleSheet } from "react-native";
import { createRoute } from "@granite-js/react-native";
import { IapProductListItem } from "@apps-in-toss/framework";
import { Asset, Border, Button, Txt, colors } from "@toss/tds-react-native";
import { usePurchase } from "hooks/usePurchase";

const windowSize = Dimensions.get("window");

export const Route = createRoute("/detail", {
  validateParams: (params) => params as { product: IapProductListItem },
  component: Detail,
});

function Detail() {
  const { purchaseProduct, loading } = usePurchase();
  const { product } = Route.useParams();
  const imageSize = windowSize.width;

  return (
    <View style={styles.container}>
      <Asset.Image
        frameShape={{ width: imageSize, height: imageSize }}
        source={{ uri: product.iconUrl }}
      />
      <View style={styles.wrapper}>
        <Txt typography="st11" fontWeight="medium" color={colors.grey700}>
          example item
        </Txt>
        <Txt typography="st7" fontWeight="bold" color={colors.grey800}>
          {product.displayName}
        </Txt>
        <Txt typography="st7" fontWeight="extraBold" color={colors.blue500}>
          {product.displayAmount}
        </Txt>
        <Txt
          typography="st10"
          fontWeight="medium"
          color={colors.grey800}
          style={styles.description}
        >
          {product.description}
        </Txt>
      </View>
      <Border type="height16" height={10} />
      <View style={styles.wrapper}>
        <Button
          display="block"
          onPress={() => {
            purchaseProduct(product.sku);
          }}
          disabled={loading}
        >
          구매하기
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  wrapper: {
    paddingHorizontal: 16,
    gap: 4,
  },
  description: {
    marginTop: 12,
  },
});
