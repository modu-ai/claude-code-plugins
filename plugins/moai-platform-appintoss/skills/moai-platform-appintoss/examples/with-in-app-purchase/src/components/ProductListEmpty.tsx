import { StyleSheet, View } from "react-native";
import { Asset, colors, Txt } from "@toss/tds-react-native";

interface ProductListEmptyProps {
  productsLength: number;
}

export function ProductListEmpty({ productsLength }: ProductListEmptyProps) {
  if (productsLength !== 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Asset.Icon
        name="icon-progress-mono"
        scale={1}
        frameShape={Asset.frameShape.SquareSmall}
        style={styles.icon}
      />
      <Txt color={colors.grey500}>상품이 없어요.</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  icon: {
    marginBottom: 16,
  },
});
