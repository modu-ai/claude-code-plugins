import { StyleSheet, View } from "react-native";
import { Text, colors, FontWeightKeys } from "@toss/tds-react-native";

interface TextBoxProps {
  text: string;
  bgColor?: string;
  fontColor?: string;
  fontWeight?: FontWeightKeys;
}

export function TextBox({
  text,
  bgColor = colors.grey100,
  fontColor = colors.grey600,
  fontWeight = "medium",
}: TextBoxProps) {
  return (
    <View style={[{ backgroundColor: bgColor }, styles.container]}>
      <Text
        typography="st10"
        fontWeight={fontWeight}
        style={{
          color: fontColor,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    width: "100%",
    height: "auto",
    minHeight: 58,
    justifyContent: "center",
    borderRadius: 16,
    marginBottom: 12,
  },
});
